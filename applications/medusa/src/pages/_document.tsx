import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import serialize from 'serialize-javascript'

function createDocument (): any {
  let capturedRelayStore

  const enhance: any = (App) => {
    return (props) => {
      capturedRelayStore = props.environment
      return <App {...props} />
    }
  }

  const Script = (props: React.ScriptHTMLAttributes<HTMLScriptElement>): any => {
    if (capturedRelayStore == null) return null

    const records = capturedRelayStore
      .getStore()
      .getSource()
      .toJSON()

    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__od_relay_store__=${serialize(records) as string}`
        }}
        {...props}
      />
    )
  }

  return {
    enhance,
    Script
  }
}

export default class Document extends NextDocument<DocumentProps> {
  static async getInitialProps (ctx: DocumentContext) {
    const relayDocument = createDocument()

    const renderPage = ctx.renderPage
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => relayDocument.enhance(App)
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      relayDocument
    }
  }

  render () {
    const { relayDocument } = this.props

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
          <relayDocument.Script />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
