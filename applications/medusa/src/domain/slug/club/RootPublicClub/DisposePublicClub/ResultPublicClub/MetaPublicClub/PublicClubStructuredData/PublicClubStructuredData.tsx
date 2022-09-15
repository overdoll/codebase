import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicClubStructuredDataFragment$key } from '@//:artifacts/PublicClubStructuredDataFragment.graphql'
import Head from 'next/head'
import React from 'react'
import addClubPostsJsonLd from './addClubPostsJsonLd'
import addClubDataJsonLd from './addClubDataJsonLd'
import addItemListJsonLd from '@//:common/structured-data/support/addItemListJsonLd'

interface Props {
  query: PublicClubStructuredDataFragment$key
}

const Fragment = graphql`
  fragment PublicClubStructuredDataFragment on Club {
    ...addClubPostsJsonLdFragment
    ...addClubDataJsonLdFragment
  }
`

export default function PublicClubStructuredData ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addClubPostsJsonLd(data)}
        key='club-page-content'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addClubDataJsonLd(data)}
        key='club-profile-data'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={addItemListJsonLd()}
        key='item-list'
      />
    </Head>
  )
}
