import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import { cache } from '@emotion/css'

export default class Document extends NextDocument {
  static async getInitialProps (ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)

    const { extractCritical } = createEmotionServer(cache)
    const {
      ids,
      css
    } = extractCritical(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`od ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </>
      )
    }
  }

  render (): JSX.Element {
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
}
