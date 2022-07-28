import Head from 'next/head'
import React from 'react'
import { DESCRIPTION_FEATURES, TITLE_SUFFIX } from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

export default function JoinRichObject (): JSX.Element {
  const TITLE = `Create an Account - ${TITLE_SUFFIX}`
  const DESCRIPTION = `Create an account and post or discover ${DESCRIPTION_FEATURES}. overdoll allows artists to post and monetize their content and for fans to discover new content.`

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
