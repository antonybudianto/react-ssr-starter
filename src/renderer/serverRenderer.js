import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import path from "path"
// import { getLoadableState } from 'loadable-components/server'
import { ChunkExtractor } from "@loadable/server"

import { HelmetProvider } from "react-helmet-async"

import CoreLayout from "../layouts/CoreLayout"
import { ASSET_URL } from "../url"

let vendor
let app
let appStyle
let vendorStyle

if (!__DEV__) {
  const manifest = require("../../dist/manifest.json")
  vendor = manifest["vendor.js"]
  app = manifest["app.js"]
  appStyle = manifest["app.css"]
  vendorStyle = manifest["vendor.css"]
}

export default async (locPath, store, context, devAssets) => {
  if (__DEV__) {
    vendor = ASSET_URL + devAssets.vendorJs
    app = ASSET_URL + devAssets.appJs
    appStyle = devAssets.appCss ? ASSET_URL + devAssets.appCss : null
    vendorStyle = devAssets.vendorCss ? ASSET_URL + devAssets.vendorCss : null
  }

  const helmetCtx = {}

  const statsFile = path.resolve(
    __dirname,
    path.resolve("./dist/loadable-stats.json")
  )
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] })

  const appStyleTag = appStyle
    ? `<link rel='stylesheet' href='${appStyle}'>`
    : ""
  const vendorStyleTag = vendorStyle
    ? `<link rel='stylesheet' href='${vendorStyle}'>`
    : ""

  const App = (
    <StaticRouter location={locPath} context={context}>
      <HelmetProvider context={helmetCtx}>
        <CoreLayout />
      </HelmetProvider>
    </StaticRouter>
  )

  const jsx = extractor.collectChunks(App)
  const content = renderToString(jsx)

  const helmet = helmetCtx.helmet

  return `<!doctype html>
      <html>
      <head>
        ${helmet.title.toString()}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        ${helmet.meta.toString()}
        ${vendorStyleTag}
        ${appStyleTag}
        <link rel="canonical" href="https://www.myreactapp.com/" >
        ${helmet.link.toString()}
      </head>
      <body>
        <div id='root'>${content}</div>
        ${extractor.getScriptTags()}
      </body>
      </html>`
}
