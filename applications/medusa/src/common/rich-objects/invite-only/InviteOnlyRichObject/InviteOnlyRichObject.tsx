import Head from 'next/head'
import React from 'react'
import { DESCRIPTION_FEATURES, TITLE_FEATURES, TITLE_SUFFIX } from '@//:modules/constants/rich-objects'

export default function InviteOnlyRichObject (): JSX.Element {
  const TITLE = `Create, Post and Monetize Your ${TITLE_FEATURES} ${TITLE_SUFFIX}`
  const DESCRIPTION = `overdoll is a platform that allows adult content artists to post their ${DESCRIPTION_FEATURES} while collecting paid supporter subscriptions.`

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
