import Head from 'next/head'
import React from 'react'
import DefaultRichObject from '../../default/DefaultRichObject/DefaultRichObject'

export default function ConfirmEmailRichObject (): JSX.Element {
  const TITLE = 'overdoll'

  return (
    <>
      <Head>
        <title>
          Confirming Your Email - overdoll
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
