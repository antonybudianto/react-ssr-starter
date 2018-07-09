import 'babel-polyfill'
import express from 'express'
import morgan from 'morgan'
import proxy from 'http-proxy-middleware'

import serverRender from './serverRenderer'
import createStore from '../store/createStore'
import { getInitialData } from '../routes'
import { HOME_PATH } from '../url'

const app = express()
const loggerEnv = __DEV__ ? 'dev' : 'combined'
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
  appJs: '',
  vendorJs: '',
  appCss: ''
}

if (__DEV__) {
  const { devMiddleware } = require('react-kits/lib/express-dev')
  devMiddleware(app)
}

app.use(HOME_PATH, express.static('dist'))

if (__DEV__) {
  const backendUrl = process.env.APP_BACKEND_URL || 'https://example.com'
  console.log('APP_BACKEND_URL = ' + backendUrl)

  app.use(
    ['/api'],
    proxy({
      secure: false,
      target: backendUrl,
      changeOrigin: true,
      prependPath: false
    })
  )
}

app.get(HOME_PATH + '(*)', (req, res) => {
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

  const store = createStore()
  // attach cookies to store object as a way to let cookies to be passed into server fetching
  req.headers.cookie && (store['cookies'] = req.headers.cookie)
  const path = req.path
  const promises = getInitialData(req, store)
  Promise.all(promises)
    .then(() => {
      let context = {}
      serverRender(path, store, context, devAssets).then(html => {
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
      console.log('Error fetching', err)
      res.status(500).send('Error')
    })
})

if (module.hot) {
  module.hot.accept('./serverRenderer', () => {
    console.log('✅ Server hot reloaded ./serverRenderer')
  })
  module.hot.accept('../routes', () => {
    console.log('✅ Server hot reloaded ../routes')
  })
  module.hot.accept('../store/createStore', () => {
    console.log('✅ Server hot reloaded ../store/createStore')
  })
}

export default app
