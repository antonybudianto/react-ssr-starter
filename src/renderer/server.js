import app from './app'

const PORT = process.env.PORT || 3000
const HOST = 'localhost'

const httpServer = app.listen(PORT, HOST, error => {
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
