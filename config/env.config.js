import { ASSET_URL_DEV, ASSET_URL_PROD, ASSET_URL_STAG } from '../src/constant'

let assetUrl = ASSET_URL_DEV
const env = process.env.NODE_ENV

if (env === 'staging') {
  assetUrl = ASSET_URL_STAG
} else if (env === 'production') {
  assetUrl = ASSET_URL_PROD
}

export default {
  assetUrl
}
