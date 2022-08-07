import Head from 'next/head'
import React from 'react'

export default function RootRichObject (): JSX.Element {
  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@overdoll_com' />
      <meta name='twitter:creator' content='@overdoll_com' />
      <meta name='theme-color' content='#ff2969' />
      <meta
        property='og:site_name'
        content='overdoll'
      />
    </Head>
  )
}
