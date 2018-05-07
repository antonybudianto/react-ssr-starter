import React from 'react'
import serialize from 'serialize-javascript'
import fs from 'fs-extra'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { getLoadableState } from 'loadable-components/server'
import { Helmet } from 'react-helmet'

import CoreLayout from '../layouts/CoreLayout'
import { ASSET_URL } from '../url'

let files = fs
  .readdirSync(__dirname)
  .filter(file => file.endsWith('js') || file.endsWith('css'))
let vendor =
  ASSET_URL + files.find(f => f.startsWith('vendor') && f.endsWith('js'))
let app = ASSET_URL + files.find(f => f.startsWith('app') && f.endsWith('js'))
let style =
  ASSET_URL + files.find(f => f.startsWith('app') && f.endsWith('css'))

export default (path, store, context, devAssets) => {
  if (__DEV__) {
    vendor = devAssets.vendorJs
    app = devAssets.appJs
    style = devAssets.appCss
  }

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
        <link rel='stylesheet' href='${style}'>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">
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
