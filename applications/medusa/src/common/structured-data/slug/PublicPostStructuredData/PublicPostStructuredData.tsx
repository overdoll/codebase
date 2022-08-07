import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostStructuredDataFragment$key } from '@//:artifacts/PublicPostStructuredDataFragment.graphql'
import Head from 'next/head'
import React from 'react'
import addPostJsonLd from './addPostJsonLd'

interface Props {
  query: PublicPostStructuredDataFragment$key
}

const Fragment = graphql`
  fragment PublicPostStructuredDataFragment on Post {
    ...addPostJsonLdFragment
  }
`

export default function PublicPostStructuredData ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addPostJsonLd(data)}
        key='post-page-details'
      />
    </Head>
  )
}
