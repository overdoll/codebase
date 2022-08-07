import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  SEARCH_TITLE_SUFFIX,
  TITLE_SEARCH_PREFIX
} from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

export default function SearchRichObject (value: string): JSX.Element {
  const TITLE = `${TITLE_SEARCH_PREFIX} ${value} - ${SEARCH_TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${value} ${DESCRIPTION_FEATURES} on ${SEARCH_TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER}.`

  const URL = `https://overdoll.com/search?q=${value}`

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
      </Head>
      <ImageRichObject />
    </>
  )
}
