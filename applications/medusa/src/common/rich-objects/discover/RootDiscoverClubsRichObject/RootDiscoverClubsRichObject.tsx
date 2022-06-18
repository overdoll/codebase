import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'

export default function RootDiscoverClubsRichObject (): JSX.Element {
  // TODO name first three clubs posting content in title and description

  const TITLE = `Discover Clubs Creating ${TITLE_FEATURES} ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} created by clubs on overdoll.com. ${DESCRIPTION_CONTENT_DISCOVER}.`

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
