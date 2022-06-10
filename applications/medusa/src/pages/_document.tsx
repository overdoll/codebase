import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import FaviconComponent from '@//:modules/next/FaviconComponent'
import 'ioredis'

export default function Document (): JSX.Element {
  return (
    <Html>
      <Head>
        <FaviconComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
