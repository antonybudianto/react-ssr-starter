/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config:project')
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: path.resolve(__dirname, '../src'),
  dir_dist: path.resolve(__dirname, '../dist'),
  dir_public: path.resolve(__dirname, '../public'),
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  serverHost: ip.address(), // use string 'localhost' to prevent exposure on local network
  serverPort: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel: {
    cacheDirectory: true
  },
  compiler_hash_type: 'chunkhash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_stats: {
    chunks: true,
    chunkModules: true,
    colors: true
  },
  compiler_vendors: [
    // 'babel-polyfill',
    // 'raf/polyfill'
    // 'react',
    // 'react-dom',
    // 'react-redux',
    // 'react-router-dom',
    // 'react-router-config',
    // 'redux',
    // 'redux-thunk',
    // 'prop-types',
    // 'axios'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  // 'process.env'  : {
  //   'NODE_ENV' : JSON.stringify(config.env),
  //   'PORT'     : config.serverPort
  // },
  'process.env.NODE_ENV': JSON.stringify(config.env),
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __STAG__: config.env === 'staging',
  __PROD__: config.env === 'production'
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
// const pkg = require('../package.json')

// config.compiler_vendors = config.compiler_vendors
//   .filter((dep) => {
//     if (pkg.dependencies[dep]) return true

//     debug(
//       `Package "${dep}" was not found as an npm dependency in package.json; ` +
//       `it won't be included in the webpack vendor bundle.
//        Consider removing it from \`compiler_vendors\` in ~/config/index.js`
//     )
//   })

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Environment NODE_ENV "${config.env}".`)

module.exports = config
