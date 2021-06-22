import { ASSET_URL_DEV, ASSET_URL_PROD, ASSET_URL_STAG } from "../src/constant"
import config from "./project.config"

let assetUrl = ASSET_URL_DEV

if (config.globals.__STAG__) {
  assetUrl = ASSET_URL_STAG
} else if (config.globals.__PROD__) {
  assetUrl = ASSET_URL_PROD
}

export default {
  assetUrl
}
