import React from 'react'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { getLoadableState } from 'loadable-components/server'
import { Helmet } from 'react-helmet'

import CoreLayout from '../layouts/CoreLayout'
import { ASSET_URL } from '../url';

let vendor
let app
let style

if (!__DEV__) {
  const manifest = require('../../dist/manifest.json')
  vendor = manifest['vendor.js']
  app = manifest['app.js']
  style = manifest['app.css']
}

export default (path, store, context, devAssets) => {
  if (__DEV__) {
    vendor = ASSET_URL + devAssets.vendorJs
    app = ASSET_URL + devAssets.appJs
    style = devAssets.appCss ? (ASSET_URL + devAssets.appCss) : null
  }

  const styleTag = style ? `<link rel='stylesheet' href='${style}'>` : ''

  const App = (
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <CoreLayout />
      </StaticRouter>
    </Provider>
  )

  return getLoadableState(App).then(loadableState => {
    const content = renderToString(App)

    const helmet = Helmet.renderStatic()

    return `<!doctype html>
      <html>
      <head>
        ${helmet.title.toString()}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        ${helmet.meta.toString()}
        ${styleTag}
        <link rel="canonical" href="https://www.myreactapp.com/" >
        ${helmet.link.toString()}
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
        ${loadableState.getScriptTag()}
        <script src='${vendor}'></script>
        <script src='${app}'></script>
      </body>
      </html>`
  })
}
