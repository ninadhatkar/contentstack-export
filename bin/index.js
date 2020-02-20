#!/usr/bin/env node
/* eslint-disable no-console */

var Bluebird = require('bluebird');
var util = require('../lib/util');
var login = require('../lib/util/login');
var config = require('../config');
var log = require('../lib/util/log');
const path = require('path');

const argv = require('yargs')
  .option('module', {
    alias: 'm',
    describe: 'Module that you want to export',
    choices: ['all', 'assets', 'entries', 'content_types', 'locales', 'labels', 'global_fields', 'environments', 'extensions', 'webhooks'],
    default: 'all'
  })
  .option('config', {
    alias: 'c',
    describe: 'Path to config see exmaple config at https://github.com/contentstack/contentstack-export/blob/master/config/index.js'
  })
  .demandOption(['config'], 'Please provide config path to start the script.')
  .strict()
  .help()
  .argv

console.log(argv.module)

let configPath = path.parse(argv.config)
config = require(configPath);

config = util.buildAppConfig(config)
util.validateConfig(config)


exports.getConfig = function () {
  return config;
};
  
  
login(config).then(function () {
  var types = config.modules.types;
  
  if (argv.module !== 'all') {
    var val = argv.module;
    
    var exportedModule = require('./lib/export/' + val);
      
    return exportedModule.start().then(function () {
      log.success(val + ' was exported successfully!');
      return;
    }).catch(function (error) {
      log.error('Failed to migrate ' + val);
      log.error(error);
      return;
    })
  } else {
    var counter = 0;
    return Bluebird.map(types, function (type) {
      log.success('Exporting: ' + types[counter])
      var exportedModule = require('./lib/export/' + types[counter]);
      counter++
      return exportedModule.start()
    }, {
      concurrency: 1
    }).then(function () {
      log.success('Stack: ' + config.source_stack + ' has been exported succesfully!');
    }).catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      log.error('Failed to migrate stack: ' + config.source_stack + '. Please check error logs for more info');
      log.error(error);
    });
  } 
});

/** 
 * contentstack-export <<module name>> 
 * contentstack-export --module <<module name>>  // exports module sepcified 
 * default to all
 * contentstack-export -m
        Options: all, assets, entries, content_types, locales, labels, global_fields, environments, extensions, webhooks
*/
