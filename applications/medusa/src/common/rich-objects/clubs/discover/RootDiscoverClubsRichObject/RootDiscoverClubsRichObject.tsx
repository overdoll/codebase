import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../../default/ImageRichObject/ImageRichObject'

export default function RootDiscoverClubsRichObject (): JSX.Element {
  const TITLE = `Discover Clubs Creating ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} created by clubs on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER}.`

  const URL = 'https://overdoll.com/clubs/discover'

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
        <link
          rel='canonical'
          href={URL}
        />
      </Head>
      <ImageRichObject />
    </>
  )
}
