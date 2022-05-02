import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document (): JSX.Element {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600' rel='stylesheet' type='text/css' />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;700;800'
          rel='stylesheet'
          type='text/css'
        />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400' rel='stylesheet' type='text/css' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
