import Head from 'next/head'
import React from 'react'

export default function ImageRichObject (): JSX.Element {
  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='og:type' content='image' />
      <meta property='og:image' content='https://static.dollycdn.net/creators/banners/large.jpg' />
      <meta property='og:image:secure_url' content='https://static.dollycdn.net/creators/banners/large.jpg' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content='2048px' />
      <meta property='og:image:height' content='1086px' />
    </Head>
  )
}
