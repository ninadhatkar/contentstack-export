/*!
* Contentstack Export
* Copyright (c) 2019 Contentstack LLC
* MIT Licensed
*/

var _ = require('lodash')
var pkg = require('../../package')
var defaultConfig = require('../../config/default')
const fs = require('fs')

var config;

exports.validateConfig = function(config) {
  if (!config.host || !config.cdn) {
    throw new Error('Host/CDN end point is missing from config');
  }
  if (!config.access_token) {
    throw new Error('Kindly provide access_token');
  }
};

exports.buildAppConfig = function (config) {
  config = _.merge(defaultConfig, config)
  config.headers = {
    api_key: config.source_stack,
    access_token: config.access_token,
    'X-User-Agent': 'contentstack-export/v' + pkg.version
  };
  return config;
}

exports.getConfig = function () {
  return config;
};

exports.setConfig = function (configPath) {
  if(configPath) {
    fs.access(configPath, fs.constants.F_OK, (err) => {
      configPath = err ? '../../config/index' : configPath;
    });
  } else {
    configPath = '../../config/index'
  }
  var cnfg = require(configPath);
  config = this.buildAppConfig(cnfg)
  this.validateConfig(config)
  return config;
};