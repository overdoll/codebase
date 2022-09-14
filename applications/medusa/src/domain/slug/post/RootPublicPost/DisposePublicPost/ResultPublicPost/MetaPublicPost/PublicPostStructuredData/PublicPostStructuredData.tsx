import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostStructuredDataFragment$key } from '@//:artifacts/PublicPostStructuredDataFragment.graphql'
import Head from 'next/head'
import React from 'react'
import addPostListJsonLd from './addPostListJsonLd'
import addPostContentJsonLd from './addPostContentJsonLd'

interface Props {
  query: PublicPostStructuredDataFragment$key
}

const Fragment = graphql`
  fragment PublicPostStructuredDataFragment on Post {
    ...addPostListJsonLdFragment
    ...addPostContentJsonLdFragment
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
        dangerouslySetInnerHTML={addPostListJsonLd(data)}
        key='post-page-details'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addPostContentJsonLd(data)}
        key='post-content-details'
      />
    </Head>
  )
}
