import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import FaviconComponent from '@//:modules/next/FaviconComponent'
import 'ioredis'

export default function Document (): JSX.Element {
  return (
    <Html>
      <Head>
        <meta
          name='description'
          content='overdoll is a site where artists can post digital adult content and earn subscription revenue from fans.'
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
