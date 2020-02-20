/* eslint-disable no-undef */
const idx = require('../../lib/util/index');
const fs = require('fs');
const path = require('path');

const defaultCustomConfig = fs.readFileSync(path.resolve('./config/index.js'))

describe('Positive test suite with default config path', () => {
  beforeAll(() => {
    const testConfig = `module.exports = { 
          master_locale: {
            name: 'English - United States',
            code: 'en-us'
          },
          email: 'test@contentstack.com',
          password: 'test',
          source_stack: 'adfsad',
          access_token: 'asdfas',
          data: './contents'
        }`
    fs.writeFileSync(path.resolve('./config/index.js'), testConfig);
  });
      
  afterAll(() => {
    fs.writeFileSync(path.resolve('./config/index.js'), defaultCustomConfig);
  });
      
  test('set config from default config path', ()=>{
    const config = idx.setConfig();
    expect(config.email).toEqual('test@contentstack.com');
    expect(config.password).toEqual('test');
    expect(config.source_stack).toEqual('adfsad');
    expect(config.access_token).toEqual('asdfas');
  })
})

describe('Validation test suite with default config path', () => {
  afterAll(() => {
    fs.writeFileSync(path.resolve('./config/index.js'), defaultCustomConfig);
  });
        
  test('should throw error', ()=> {
    jest.resetModules()
    const testConfig = `module.exports = { 
        master_locale: {
          name: 'English - United States',
          code: 'en-us'
        },
        email: '',
        password: '',
        source_stack: 'adfsad',
        access_token: '',
        data: './contents'
      }`
    fs.writeFileSync(path.resolve('./config/index.js'), testConfig);
    expect(idx.setConfig).toThrow();
  });

  test('should throw error', ()=> {
    jest.resetModules()
    const testConfig = `module.exports = { 
        master_locale: {
          name: 'English - United States',
          code: 'en-us'
        },
        host:'',
        email: '',
        password: '',
        source_stack: 'adfsad',
        access_token: '',
        data: './contents'
      }`
    fs.writeFileSync(path.resolve('./config/index.js'), testConfig);
    expect(idx.setConfig).toThrow();
  })
})

describe('Positive test suite with external config path', () => {
  test('set config from external config path', ()=>{
    const config = idx.setConfig(path.resolve('./__test__/dummy/config.js'));
    expect(config.email).toEqual('custom@contentstack.com');
    expect(config.password).toEqual('password');
    expect(config.source_stack).toEqual('customstack');
    expect(config.access_token).toEqual('customauthtoken');
  })
})