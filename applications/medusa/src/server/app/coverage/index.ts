import express from 'express'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __coverage__: any
    }
  }
}

const router = express.Router()

if (process.env.APP_DEBUG != null) {
  router.get('/__coverage__', (req, res) => res.json({
    coverage: global.__coverage__ ?? null
  }))
}

export default router
