import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import path from "path"
import { ChunkExtractor } from "@loadable/server"

import { HelmetProvider } from "react-helmet-async"

import CoreLayout from "../layouts/CoreLayout"

export default async (locPath, store, context) => {
  const helmetCtx = {}

  const statsFile = path.resolve(
    __dirname,
    path.resolve("./dist/loadable-stats.json")
  )
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] })

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
        ${extractor.getStyleTags()}
        <link rel="canonical" href="https://www.myreactapp.com/" >
        ${helmet.link.toString()}
      </head>
      <body>
        <div id='root'>${content}</div>
        ${extractor.getScriptTags()}
      </body>
      </html>`
}
