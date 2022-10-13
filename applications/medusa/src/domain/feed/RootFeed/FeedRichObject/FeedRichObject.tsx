import Head from 'next/head'
import React from 'react'
import ImageRichObject from '@//:common/rich-objects/default/ImageRichObject/ImageRichObject'

export default function FeedRichObject (): JSX.Element {
  const TITLE = 'overdoll - Your Feed'
  const DESCRIPTION = 'See your personal content feed on overdoll'

  const URL = 'https://overdoll.com/feed'

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
