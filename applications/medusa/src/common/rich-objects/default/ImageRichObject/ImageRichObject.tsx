import Head from 'next/head'
import React from 'react'

export default function ImageRichObject (): JSX.Element {
  return (
    <Head>
      <meta
        property='og:image'
        content='https://static.dollycdn.net/manifest/android-chrome-512x512.png'
      />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='512' />
      <meta property='og:image:height' content='512' />
    </Head>
  )
}
