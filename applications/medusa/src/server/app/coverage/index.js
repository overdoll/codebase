import express from 'express'

const router = express.Router()

if (process.env.APP_DEBUG) {
  router.get('/__coverage__', (req, res) => res.json({
    coverage: global.__coverage__ || null
  }))
}

export default router
