import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.2,
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NEXT_PUBLIC_APP_ENV
})
