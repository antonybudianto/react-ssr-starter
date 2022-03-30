import React from "react"
import fs from "fs"
import { renderToPipeableStream } from "react-dom/server"

import { StaticRouter } from "react-router-dom"
import path from "path"

import { HelmetProvider } from "react-helmet-async"

import CoreLayout from "../layouts/CoreLayout"

const isProd = process.env.NODE_ENV === "production"

export default async (locPath, store, context, devAssets, res) => {
  const helmetCtx = {}

  const statsFile = path.resolve(
    __dirname,
    path.resolve("./dist/manifest.json")
  )
  const stats = JSON.parse(fs.readFileSync(statsFile, { encoding: "utf-8" }))
  const styleTag = `<link href="${stats["app.css"]}" rel="stylesheet" />`
  const scriptTags = `<script src="${
    stats["vendor.js"]
  }" type="text/javascript"></script>
  <script src="${stats["app.js"]}" type="text/javascript"></script>`

  const app = (
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
  ${isProd ? styleTag : ""}
  <link rel="canonical" href="https://www.myreactapp.com/" >
</head>`

  let error

  const { pipe } = renderToPipeableStream(app, {
    onCompleteShell() {
      console.log("--complete-shell")
    },
    onAllReady() {
      console.log("--all-ready", error, context)
      const statusCode = context.status ? context.status : 200
      res.statusCode = error ? 500 : statusCode
      res.setHeader("Content-type", "text/html")

      if (error) {
        res.send(`<!doctype html>
        <html>
        ${HEAD_SECTION}
        <body><div id="root"></div>
        <script>window.__ssrError=true;</script>${scriptTags}</body>
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
      ${scriptTags}
      </body>
      </html>`)
    },
    onShellError(x) {
      console.log("--shell-error: ", x)
      error = true
    }
  })
}
