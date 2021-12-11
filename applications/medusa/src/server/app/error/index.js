import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import Display from '../../../client/Display'
import i18next from 'i18next'
import ErrorDisplay from '../../../client/domain/Error/ErrorPage/ErrorPage'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import logger from '../../utilities/logger'

// Error - handles errors that may be thrown during rendering, which
// may either be a server error or a rendering error

// this route will ensure we only render the bare-minimum components, and
// we do not add any javascript to our document, so we don't have interactivity
async function request (err, req, res, next) {
  const helmetContext = {}
  const nonce = res.locals.cspNonce

  const cache = createCache({
    key: EMOTION_CACHE_KEY,
    nonce
  })
  const { extractCritical } = createEmotionServer(cache)

  const {
    html,
    css,
    ids
  } = extractCritical(
    renderToString(
      <Display
        i18next={i18next}
        emotionCache={cache}
        helmetContext={helmetContext}
      >
        <ErrorDisplay error={err} />
      </Display>
    )
  )

  // indicate an error occurred with 500 status
  res.status(500)
    .render('error', {
      title: helmetContext.helmet.title.toString(),
      meta: helmetContext.helmet.meta.toString(),
      link: helmetContext.helmet.link.toString(),
      html,
      publicPath: process.env.PUBLIC_PATH,
      nonce,
      emotionIds: ids.join(' '),
      emotionCss: css
    })
}

// Render error page. If that fails, fallback to just sending a 500 response
export default async function error (err, req, res, next) {
  try {
    await request(err, req, res, next)
  } catch (e) {
    if (process.env.APP_DEBUG === 'true') {
      return next(err)
    } else {
      // TODO: report error to sentry
      logger.error({
        http: err.http,
        logger: {
          name: logger.name,
          thread_name: err.process
        },
        error: {
          message: err.message,
          kind: err.name,
          stack: err.stack
        },
        message: `${err.name}: ${err.message}`
      })
    }

    res.status(err.status || 500).end()
  }
}
