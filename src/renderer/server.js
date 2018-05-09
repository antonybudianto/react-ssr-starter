import app from './app'
import { serverPort, serverHost } from '../../config/project.config'

const httpServer = app.listen(serverPort, serverHost, error => {
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
