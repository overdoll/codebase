import Head from 'next/head'
import React from 'react'
import addItemListJsonLd from '../support/addItemListJsonLd'
import RootStructuredData from '../RootStructuredData/RootStructuredData'

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
