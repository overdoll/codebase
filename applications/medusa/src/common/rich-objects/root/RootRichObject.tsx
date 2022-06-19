import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES
} from '@//:modules/constants/rich-objects'

export default function RootRichObject (): JSX.Element {
  return (
    <>
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
          content={`${DESCRIPTION_PREFIX} ${DESCRIPTION_FEATURES} on overdoll.com. ${DESCRIPTION_CONTENT_DISCOVER}.`}
        />
      </Head>
    </>
  )
}
