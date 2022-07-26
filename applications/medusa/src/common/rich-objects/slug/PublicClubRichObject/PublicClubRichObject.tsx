import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicClubRichObjectFragment$key } from '@//:artifacts/PublicClubRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject from '../PublicPostRichObject/PostContentRichObject/PostContentRichObject'
import {
  DESCRIPTION_CONTENT_TYPES,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'

interface Props {
  query: PublicClubRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicClubRichObjectFragment on Club {
    slug
    name
    backgroundPost: posts(first: 1) {
      edges {
        node {
          ...PostContentRichObjectFragment
        }
      }
    }
  }
`

export default function PublicClubRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${data.name}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.name}'s ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_TYPES} from ${data.name}.`

  const URL = `https://overdoll.com/${data.slug}`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          key='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          key='description'
          content={DESCRIPTION}
        />
        <meta
          property='og:description'
          key='og:description'
          content={DESCRIPTION}
        />
        <meta
          property='og:url'
          key='og:url'
          content={URL}
        />
      </Head>
      <PostContentRichObject query={data.backgroundPost?.edges[0]?.node} />
    </>
  )
}
