import React from "react"
// import { renderToString } from "react-dom/server"
import { pipeToNodeWritable } from "react-dom/server"

import { StaticRouter } from "react-router-dom"
import path from "path"
import { ChunkExtractor } from "@loadable/server"

import { HelmetProvider } from "react-helmet-async"

import CoreLayout from "../layouts/CoreLayout"

export default async (locPath, store, context, devAssets, res) => {
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
  // const content = renderToString(jsx)

  const { startWriting, abort } = pipeToNodeWritable(jsx, res, {
    onReadyToStream() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = 200
      res.setHeader("Content-type", "text/html")

      res.write(`<!DOCTYPE html>
      <html>
      <head>
         <meta name="robots" content="noindex,nofollow" />
         <meta name="mobile-web-app-capable" content="yes">
         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
         ${extractor.getStyleTags()}
         <link rel="canonical" href="https://www.myreactapp.com/" >
       </head>
      <body>
      <div id="root">
      `)
      startWriting()
      res.write(`${extractor.getScriptTags()}
      </div>
      </body>
      </html>`)
    },
    // onCompleteAll() {
    // },
    onError(x) {
      console.error(x)
    }
  })

  setTimeout(abort, 10000)

  // const helmet = helmetCtx.helmet

  // return `<!doctype html>
  //     <html>
  //     <head>
  //       ${helmet.title.toString()}
  //       <meta name="robots" content="noindex,nofollow" />
  //       <meta name="mobile-web-app-capable" content="yes">
  //       <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  //       ${helmet.meta.toString()}
  //       ${vendorStyleTag}
  //       ${appStyleTag}
  //       <link rel="canonical" href="https://www.myreactapp.com/" >
  //       ${helmet.link.toString()}
  //     </head>
  //     <body>
  //       <div id='root'>${content}</div>
  //       ${extractor.getScriptTags()}
  //     </body>
  //     </html>`
}
