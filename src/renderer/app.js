import 'babel-polyfill'
import React from 'react'

import { createReactServer } from 'react-kits-server'

import createStore from '../store/createStore'
import { getInitialData } from '../routes'
import { HOME_PATH, ASSET_URL } from '../url'
import CoreLayout from '../layouts/CoreLayout'

const app = createReactServer({
  createStore,
  getInitialData,
  homePath: HOME_PATH,
  assetUrl: ASSET_URL,
  customMiddleware: ins => {
    if (__DEV__) {
      const proxy = require('http-proxy-middleware')
      const backendUrl =
        process.env.APP_BACKEND_URL || 'https://staging.tokopedia.com'
      console.log('APP_BACKEND_URL = ' + backendUrl)

      ins.use(
        ['/microfinance'],
        proxy({
          secure: false,
          target: backendUrl,
          changeOrigin: true,
          prependPath: false
        })
      )
    }
  },
  onRender: () => <CoreLayout />
})

if (module.hot) {
  module.hot.accept('../routes', () => {
    console.log('✅ Server hot reloaded ../routes')
  })
  module.hot.accept('../layouts/CoreLayout', () => {
    console.log('✅ Server hot reloaded ../layouts')
  })
  module.hot.accept('../store/createStore', () => {
    console.log('✅ Server hot reloaded ../store/createStore')
  })
}

export default app
