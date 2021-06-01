import React, { Suspense } from 'react'
import darkTheme from './dark'
import i18next from '../src/client/bootstrap/i18next'
import Display from '../src/client/Display'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: darkTheme
  }
}

const cache = createCache({ key: EMOTION_CACHE_KEY })

export const decorators = [
  Story => (
    <Suspense fallback="">
      <Display
        emotionCache={cache}
        i18next={i18next}
      >
        <Story />
      </Display>
    </Suspense>
  )
]
