/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')

console.log('Creating default configuration.')
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

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  // serverHost: ip.address(), // use string 'localhost' to prevent exposure on local network
  serverHost: 'localhost',
  serverPort: process.env.PORT || 3000
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
  'process.env.NODE_ENV': JSON.stringify(config.env),
  __DEV__: config.env === 'development',
  __STAG__: config.env === 'staging',
  __PROD__: config.env === 'production'
}

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
console.log(`Environment NODE_ENV "${config.env}".`)

module.exports = config
