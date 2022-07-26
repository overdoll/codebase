import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  SEARCH_TITLE_SUFFIX,
  TITLE_FEATURES,
  TITLE_SEARCH_PREFIX
} from '@//:modules/constants/rich-objects'

export default function RootSearchRichObject (): JSX.Element {
  const TITLE = `${TITLE_SEARCH_PREFIX} ${TITLE_FEATURES} - ${SEARCH_TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} on ${SEARCH_TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER}.`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          name='og:title'
          key='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          key='description'
          content={DESCRIPTION}
        />
        <meta
          name='og:description'
          key='og:description'
          content={DESCRIPTION}
        />
      </Head>
    </>
  )
}
