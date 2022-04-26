import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import createEmotionServer from '@emotion/server/create-instance'

import createCache from '@emotion/cache'

export default class Document extends NextDocument {
  static async getInitialProps (ctx): Promise<any> {
    const {
      extractCriticalToChunks
    } = createEmotionServer(createCache({
      key: 'od'
    }))

    const initialProps = await NextDocument.getInitialProps(ctx)

    // This is important. It prevents emotion to render invalid HTML.
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return {
      ...initialProps,
      styles: emotionStyleTags
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
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
