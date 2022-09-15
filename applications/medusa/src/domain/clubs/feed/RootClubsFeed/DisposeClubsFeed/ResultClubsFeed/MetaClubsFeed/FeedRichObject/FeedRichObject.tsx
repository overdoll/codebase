import Head from 'next/head'
import React from 'react'
import DefaultRichObject from '@//:common/rich-objects/default/DefaultRichObject/DefaultRichObject'

export default function FeedRichObject (): JSX.Element {
  const TITLE = 'Your Feed - overdoll'

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
