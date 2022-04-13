import express from 'express'

const router = express.Router()

router.use('/api/version', (req, res, next) => res.send(process.env.APP_VERSION))

export default router
