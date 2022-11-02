import { DESCRIPTION_CONTENT_DISCOVER, SEARCH_TITLE_SUFFIX } from '@//:modules/constants/rich-objects'
import Head from 'next/head'
import React from 'react'
import ImageRichObject from '@//:common/rich-objects/default/ImageRichObject/ImageRichObject'

export default function BrowseSeriesRichObject (): JSX.Element {
  const TITLE = `Browse Series - ${SEARCH_TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_CONTENT_DISCOVER} on ${SEARCH_TITLE_SUFFIX}.`

  const URL = 'https://overdoll.com/search/series'

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
        <meta
          property='og:url'
          content={URL}
        />
        <link
          rel='canonical'
          href={URL}
        />
        <ImageRichObject />
      </Head>
    </>
  )
}
