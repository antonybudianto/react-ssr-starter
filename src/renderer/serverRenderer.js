import React from "react"
import { renderToPipeableStream } from "react-dom/server"

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

  const HEAD_SECTION = `<head>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  ${extractor.getStyleTags()}
  <link rel="canonical" href="https://www.myreactapp.com/" >
</head>`

  const jsx = extractor.collectChunks(App)
  let error

  const { pipe } = renderToPipeableStream(jsx, {
    onCompleteShell() {
      console.log("--complete-shell")
    },
    onAllReady() {
      console.log("--all-ready", error)
      res.statusCode = error ? 500 : 200
      res.setHeader("Content-type", "text/html")

      if (error) {
        res.send(`<!doctype html>
        <html>
        ${HEAD_SECTION}
        <body><div id="root"></div>
        <script>window.__ssrError=true;</script>${extractor.getScriptTags()}</body>
        </html>`)
        return
      }

      res.write(`<!DOCTYPE html>
      <html>
      ${HEAD_SECTION}
      <body>
      <div id="root">`)

      pipe(res)

      res.write(`</div>
      ${extractor.getScriptTags()}
      </body>
      </html>`)
    },
    onShellError(x) {
      console.log("--shell-error: ", x)
      error = true
    }
  })

  // setTimeout(abort, 10000)

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
