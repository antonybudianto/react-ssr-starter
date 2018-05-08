import { ASSET_URL_PROD, ASSET_URL_STAG, ASSET_URL_DEV } from './constant'

let assetUrl = ASSET_URL_PROD

if (__DEV__) {
  assetUrl = ASSET_URL_DEV
} else if (__STAG__) {
  assetUrl = ASSET_URL_STAG
}

export const HOME_PATH = '/'
export const ASSET_URL = assetUrl
