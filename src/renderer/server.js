import app from './app'
import { serverPort } from '../../config/project.config'

const port = serverPort

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
