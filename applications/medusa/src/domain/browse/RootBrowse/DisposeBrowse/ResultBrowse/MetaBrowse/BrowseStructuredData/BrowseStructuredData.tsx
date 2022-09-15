import Head from 'next/head'
import React from 'react'
import addItemListJsonLd from '@//:common/structured-data/support/addItemListJsonLd'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'

export default function BrowseStructuredData (): JSX.Element {
  return (
    <>
      <RootStructuredData />
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={addItemListJsonLd()}
          key='item-list'
        />
      </Head>
    </>
  )
}
