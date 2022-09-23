import Head from 'next/head'
import React from 'react'
import DefaultRichObject from '@//:common/rich-objects/default/DefaultRichObject/DefaultRichObject'

export default function CreatePostRichObject (): JSX.Element {
  const TITLE = 'Create Post - overdoll'

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
