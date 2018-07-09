const {
  ASSET_URL_DEV,
  ASSET_URL_PROD,
  ASSET_URL_STAG
} = require('../src/constant')
const config = require('./project.config')

let assetUrl = ASSET_URL_DEV

if (config.globals.__STAG__) {
  assetUrl = ASSET_URL_STAG
} else if (config.globals.__PROD__) {
  assetUrl = ASSET_URL_PROD
}

module.exports = {
  assetUrl
}
