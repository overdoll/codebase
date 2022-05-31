import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN: string =
  process.env.SENTRY_DSN as string

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.0
})
