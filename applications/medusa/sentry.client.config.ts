import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.2,
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  beforeSend (event) {
    if (event.exception?.values != null) {
      let shouldSend = true

      event.exception.values.forEach((item) => {
        if (item.value === 'Minified React error #421; visit https://reactjs.org/docs/error-decoder.html?invariant=421 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.') {
          shouldSend = false
        }

        if (item.value === 'Minified React error #419; visit https://reactjs.org/docs/error-decoder.html?invariant=419 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.') {
          shouldSend = false
        }
      })

      if (!shouldSend) {
        return null
      }
    }

    return event
  }
})
