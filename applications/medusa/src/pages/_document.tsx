import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import FaviconComponent from '@//:modules/next/FaviconComponent'
import 'ioredis'

export default function Document (): JSX.Element {
  return (
    <Html prefix='og: https://ogp.me/ns#'>
      <Head>
        <meta property='og:site_name' content='overdoll' />
        <meta property='og:title' content='overdoll.com - Rule34, Hentai, 3D Porn and Videos' />
        <meta
          name='description'
          content='overdoll is a platform where adult content artists and fans connect. Artists can collect subscriptions from posting and fans can find any content.'
        />
        <FaviconComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
