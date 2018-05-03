import 'babel-polyfill'
import express from 'express'
import morgan from 'morgan'
import proxy from 'http-proxy-middleware'

import serverRender from './serverRenderer'
import createStore from '../store/createStore'
import { getInitialData } from '../routes'
import { HOME_PATH } from '../url'
import project from '../../config/project.config'

const app = express()
const loggerEnv = process.env.NODE_ENV === 'development' ? 'dev' : 'combined'
const logger = morgan(loggerEnv, {
  skip: function(req, res) {
    if (process.env.NODE_ENV === 'development') {
      return false
    }
    return res.statusCode < 400
  }
})

app.use(logger)

if (__DEV__) {
  const backendUrl = process.env.BACKEND_URL
  console.log('BACKEND_URL = ' + backendUrl)

  app.use(HOME_PATH, express.static('dist'))

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

const port = project.serverPort

if (__DEV__) {
  console.log('reload is on')
  const reload = require('reload')
  reload(app)
}

app.get(HOME_PATH + '(*)', (req, res) => {
  const store = createStore()
  // attach cookies to store object as a way to let cookies to be passed into server fetching
  req.headers.cookie && (store['cookies'] = req.headers.cookie)
  const path = req.path
  const promises = getInitialData(req, store)
  Promise.all(promises)
    .then(() => {
      let context = {}
      serverRender(path, store, context).then(html => {
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

app.listen(port, () => {
  console.log('Listening to port ' + port)
})
