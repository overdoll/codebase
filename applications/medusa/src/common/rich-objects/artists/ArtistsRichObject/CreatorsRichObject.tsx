import Head from 'next/head'
import React from 'react'

export default function CreatorsRichObject (): JSX.Element {
  const TITLE = 'overdoll - For 18+ Creators'
  const DESCRIPTION = 'overdoll is the first platform to offer a full end-to-end ecosystem for adult content creators.'

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
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:type' content='image' />
        <meta property='og:image' content='https://static.dollycdn.net/creators/banners/large.jpg' />
        <meta property='og:image:secure_url' content='https://static.dollycdn.net/creators/banners/large.jpg' />
        <meta property='og:image:type' content='image/jpeg' />
        <meta property='og:image:width' content='2048px' />
        <meta property='og:image:height' content='1086px' />
      </Head>
    </>
  )
}
