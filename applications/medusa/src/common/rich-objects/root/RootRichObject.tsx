import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'

export default function RootRichObject (): JSX.Element {
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER}.`

  return (
    <Head>
      <meta
        property='og:site_name'
        content='overdoll'
      />
      <meta
        property='og:title'
        key='og:title'
        content={`overdoll.com - ${TITLE_FEATURES}`}
      />
      <meta
        name='description'
        key='description'
        content={DESCRIPTION}
      />
      <meta
        property='og:description'
        key='og:description'
        content={DESCRIPTION}
      />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@overdoll_com' />
      <meta name='twitter:creator' content='@overdoll_com' />
      <meta name='theme-color' content='#ff2969' />
      <meta
        property='og:image'
        key='og-image'
        content='https://static.dollycdn.net/manifest/android-chrome-512x512.png'
      />
    </Head>
  )
}
