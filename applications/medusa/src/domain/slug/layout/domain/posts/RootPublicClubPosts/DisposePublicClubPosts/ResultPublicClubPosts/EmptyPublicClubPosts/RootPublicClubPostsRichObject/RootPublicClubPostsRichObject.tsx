import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_TYPES,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SEARCH_PREFIX,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ImageRichObject from '@//:common/rich-objects/default/ImageRichObject/ImageRichObject'

export default function RootPublicClubPostsRichObject (): JSX.Element {
  const TITLE = `${TITLE_SEARCH_PREFIX} ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_TYPES}.`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <meta
          property='og:description'
          content={DESCRIPTION}
        />
      </Head>
      <ImageRichObject />
    </>
  )
}
