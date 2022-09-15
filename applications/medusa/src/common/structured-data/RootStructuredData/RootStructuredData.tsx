import Head from 'next/head'
import React from 'react'
import addWebsiteJsonLd from '../support/addWebsiteJsonLd'

export default function RootStructuredData (): JSX.Element {
  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addWebsiteJsonLd()}
        key='website-details'
      />
    </Head>
  )
}
