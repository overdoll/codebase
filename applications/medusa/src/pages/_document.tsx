import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import FaviconComponent from '@//:modules/next/FaviconComponent'
import FontComponent from '@//:modules/next/FontComponent'

export default function Document (): JSX.Element {
  return (
    <Html>
      <Head>
        <FontComponent />
        <FaviconComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
