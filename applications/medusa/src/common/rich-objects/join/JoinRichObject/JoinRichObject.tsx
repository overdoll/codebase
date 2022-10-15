import Head from 'next/head'
import React from 'react'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

export default function JoinRichObject (): JSX.Element {
  const TITLE = 'Join overdoll'
  const DESCRIPTION = 'Join overdoll to get a personalized feed or post your content. overdoll allows artists to post and monetize their content and for fans to discover new content.'

  const URL = 'https://overdoll.com/join'

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
