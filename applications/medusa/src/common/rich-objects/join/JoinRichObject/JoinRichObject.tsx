import Head from 'next/head'
import React from 'react'
import { DESCRIPTION_FEATURES, TITLE_SUFFIX } from '@//:modules/constants/rich-objects'

export default function JoinRichObject (): JSX.Element {
  const TITLE = `Create an Account ${TITLE_SUFFIX}`
  const DESCRIPTION = `Create an account and post or discover ${DESCRIPTION_FEATURES}. overdoll allows artists to post and monetize their content and for fans to discover new content.`

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
