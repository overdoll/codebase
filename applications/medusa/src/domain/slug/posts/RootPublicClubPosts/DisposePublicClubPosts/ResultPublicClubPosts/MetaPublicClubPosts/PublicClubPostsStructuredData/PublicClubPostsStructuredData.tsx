import { graphql, useFragment } from 'react-relay/hooks'
import type {
  PublicClubPostsStructuredDataFragment$key
} from '@//:artifacts/PublicClubPostsStructuredDataFragment.graphql'
import Head from 'next/head'
import React from 'react'
import addItemListJsonLd from '@//:common/structured-data/support/addItemListJsonLd'
import addClubPostsListJsonLd from './addClubPostsListJsonLd'

interface Props {
  query: PublicClubPostsStructuredDataFragment$key
}

const Fragment = graphql`
  fragment PublicClubPostsStructuredDataFragment on Club {
    ...addClubPostsListJsonLdFragment
  }
`

export default function PublicClubPostsStructuredData ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addItemListJsonLd()}
        key='item-list'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addClubPostsListJsonLd(data)}
        key='club-posts-list'
      />
    </Head>
  )
}
