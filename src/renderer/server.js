import app from './app'
import { serverPort } from '../../config/project.config'

const port = serverPort

// Give hot reload client a chance to get the data before server refreshed
const SERVER_RELOAD_TIMEOUT = 5000

const httpServer = app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    const address = httpServer.address()
    console.info(
      `==> 🌎 Listening on ${address.port}. Open up http://localhost:${
        address.port
      }/ in your browser.`
    )
  }
})

if (module.hot) {
  console.log('=================== ahhhhhh ==================')
  // Hot reload of `app` and related modules.
  let currentApp = app
  module.hot.accept('./app', () => {
    setTimeout(() => {
      httpServer.removeListener('request', currentApp)
      import('./app')
        .then(m => {
          httpServer.on('request', m.default)
          currentApp = m.default
          console.log('Server reloaded!')
        })
        .catch(err => console.error(err))
    }, SERVER_RELOAD_TIMEOUT)
  })

  // Hot reload of entry module (self). It will be restart http-server.
  module.hot.accept()
  module.hot.dispose(() => {
    console.log('Disposing entry module...')
    httpServer.close()
  })
}
