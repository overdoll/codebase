import express from 'express'

// Unhandled errors && exceptions should crash the process (if some graph services are unavailable, we sometimes get into an undefined state)
process.on('uncaughtException', err => {
  console.log(err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise)
  process.exit(1)
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
let app = require('./server').default

// @ts-expect-error
if (module.hot != null) {
  // @ts-expect-error
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = 8080

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (): void => {
    console.log(`> Started on port ${port}`)
  })
