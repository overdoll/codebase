import Head from 'next/head'
import React from 'react'
import DefaultRichObject from '@//:common/rich-objects/default/DefaultRichObject/DefaultRichObject'

export default function LikedPostsRichObject (): JSX.Element {
  const TITLE = 'Your Saved Posts - overdoll'

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
      </Head>
      <DefaultRichObject />
    </>
  )
}
