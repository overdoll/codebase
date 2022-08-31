import Head from 'next/head'
import React from 'react'
import { DESCRIPTION_FEATURES, TITLE_FEATURES, TITLE_SUFFIX } from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

export default function ArtistsRichObject (): JSX.Element {
  const TITLE = `Post and Discover Your ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `overdoll is a platform that allows adult content artists to post and discover their ${DESCRIPTION_FEATURES}.`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          name='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <meta
          name='og:description'
          content={DESCRIPTION}
        />
      </Head>
      <ImageRichObject />
    </>
  )
}
