import logger from '../utilities/logger'

// Handle server errors
// In the future, we may want to display an HTML page. For now, it will just be a JSON response
export default (err, req, res, next) => {
  // If in debug, we are OK to show the error that occurred. In production,
  // they would be deferred to a static error page presented by our ingress
  if (process.env.APP_DEBUG === 'true') {
    console.log(err)
    next(err)
  } else {
    // TODO: report error to sentry
    logger.error({
      http: err.http,
      logger: { name: logger.name, thread_name: err.process },
      error: { message: err.message, kind: err.name, stack: err.stack },
      message: `${err.name}: ${err.message}`
    })
  }

  res.status(err.status || 500).end()
}
