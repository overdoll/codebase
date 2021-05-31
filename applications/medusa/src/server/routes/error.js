import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import Display from '../../client/Display'
import i18next from 'i18next'
import ErrorDisplay from '../../client/components/errorDisplay'
import { EMOTION_CACHE_KEY } from '../constants/emotion'

// Error - handles errors that may be thrown during rendering, which
// may either be a server error or a rendering error

// this route will ensure we only render the bare-minimum components, and
// we do not add any javascript to our document, so we don't have interactivity
async function request (err, req, res, next) {
  const helmetContext = {}
  const nonce = res.locals.cspNonce

  const cache = createCache({ key: EMOTION_CACHE_KEY, nonce })
  const { extractCritical } = createEmotionServer(cache)

  const { html, css, ids } = extractCritical(
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
  res.status(500).render('error', {
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

export default function error () {
  return async function (err, req, res, next) {
    try {
      await request(err, req, res, next)
    } catch (e) {
      next(e)
    }
  }
}
