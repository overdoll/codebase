import Head from 'next/head'
import React from 'react'
import addItemListJsonLd from '../../root/RootStructuredData/addItemListJsonLd'
import RootStructuredData from '../../root/RootStructuredData/RootStructuredData'

export default function HomeStructuredData (): JSX.Element {
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
