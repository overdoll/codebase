import Head from 'next/head'
import React from 'react'
import DefaultRichObject from '../../default/DefaultRichObject/DefaultRichObject'

export default function HelpRichObject (): JSX.Element {
  const TITLE = 'Help - overdoll'

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          content={TITLE}
        />
      </Head>
      <DefaultRichObject />
    </>
  )
}
