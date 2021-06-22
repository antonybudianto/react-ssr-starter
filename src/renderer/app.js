import "@babel/polyfill"

import express from "express"
import morgan from "morgan"
import proxy from "http-proxy-middleware"

import serverRender from "./serverRenderer"
import { getInitialData } from "../routes"
import { HOME_PATH } from "../url"

const app = express()
const loggerEnv = __DEV__ ? "dev" : "combined"
const logger = morgan(loggerEnv, {
  skip: function(req, res) {
    if (__DEV__) {
      return false
    }
    return res.statusCode < 400
  }
})

app.use(logger)

let devAssets = {
  appJs: "",
  vendorJs: "",
  appCss: ""
}

if (__DEV__) {
  var webpack = require("webpack")
  var webpackConfig = require("../../config/webpack.client.config.babel")
  var compiler = webpack(webpackConfig)

  app.use(
    require("webpack-dev-middleware")(compiler, {
      serverSideRender: true,
      publicPath: webpackConfig.output.publicPath
    })
  )
  app.use(require("webpack-hot-middleware")(compiler))
}

app.use(HOME_PATH, express.static("dist"))

if (__DEV__) {
  const backendUrl = process.env.APP_BACKEND_URL || "https://example.com"
  console.log("APP_BACKEND_URL = " + backendUrl)

  app.use(
    ["/api"],
    proxy({
      secure: false,
      target: backendUrl,
      changeOrigin: true,
      prependPath: false
    })
  )
}

app.get(HOME_PATH + "(*)", (req, res) => {
  if (__DEV__) {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
    devAssets.appJs = assetsByChunkName.app.find(f =>
      /^app(\.[a-z0-9]+)?\.js$/.test(f)
    )
    devAssets.appCss = assetsByChunkName.app.find(f =>
      /^app(\.[a-z0-9]+)?\.css$/.test(f)
    )
    devAssets.vendorJs = assetsByChunkName.vendor.find(f =>
      /^vendor(\.[a-z0-9]+)?\.js$/.test(f)
    )
    devAssets.vendorCss = assetsByChunkName.vendor.find(f =>
      /^vendor(\.[a-z0-9]+)?\.css$/.test(f)
    )
  }

  // attach cookies to store object as a way to let cookies to be passed into server fetching
  // req.headers.cookie && (store["cookies"] = req.headers.cookie)
  const path = req.path
  const promises = getInitialData(req, {})
  Promise.all(promises)
    .then(() => {
      let context = {}
      serverRender(path, {}, context, devAssets).then(html => {
        if (context.status === 404) {
          return res.status(404).send(html)
        }
        if (context.url) {
          return res.redirect(302, context.url)
        }
        res.send(html)
      })
    })
    .catch(err => {
      console.log("Error fetching", err)
      res.status(500).send("Error")
    })
})

if (module.hot) {
  module.hot.accept("./serverRenderer", () => {
    console.log("✅ Server hot reloaded ./serverRenderer")
  })
  module.hot.accept("../routes", () => {
    console.log("✅ Server hot reloaded ../routes")
  })
}

export default app
