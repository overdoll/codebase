import Head from 'next/head'
import React from 'react'
import { DESCRIPTION_FEATURES, TITLE_FEATURES, TITLE_SUFFIX } from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../../default/ImageRichObject/ImageRichObject'

export default function InviteOnlyRichObject (): JSX.Element {
  const TITLE = `Create, Post and Monetize Your ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `overdoll is a platform that allows adult content artists to post their ${DESCRIPTION_FEATURES} while collecting paid supporter subscriptions.`

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
