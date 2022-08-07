import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ImageRichObject from '../ImageRichObject/ImageRichObject'

export const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER}.`

export default function DefaultRichObject (): JSX.Element {
  return (
    <>
      <Head>
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
