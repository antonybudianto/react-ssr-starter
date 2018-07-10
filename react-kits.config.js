const {
  ASSET_URL_DEV,
  ASSET_URL_PROD,
  ASSET_URL_STAG
} = require('./src/constant')

let assetUrl = ASSET_URL_DEV

module.exports = projectConfig => {
  if (projectConfig.globals.__STAG__) {
    assetUrl = ASSET_URL_STAG
  } else if (projectConfig.globals.__PROD__) {
    assetUrl = ASSET_URL_PROD
  }
  return {
    baseWebpack: () => {
      return {
        output: {
          publicPath: assetUrl
        }
      }
    }
  }
}
