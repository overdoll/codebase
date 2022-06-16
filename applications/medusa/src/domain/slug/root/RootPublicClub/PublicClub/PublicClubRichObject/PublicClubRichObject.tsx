import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicClubRichObjectFragment$key } from '@//:artifacts/PublicClubRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject
  from '../../../../post/RootPublicPost/PublicPost/PublicPostRichObject/PostContentRichObject/PostContentRichObject'

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

  const ogTitle = `${data.name} on overdoll - overdoll.com/${data.slug}`

  const ogUrl = `https://overdoll.com/${data.slug}`

  return (
    <>
      <Head>
        <title>
          {ogTitle}
        </title>
        <meta property='og:title' content={ogTitle} />
        <meta property='og:description' content={`See Rule34, Hentai, 3D Porn and Videos posted by ${data.name}`} />
        <meta property='og:url' content={ogUrl} />

      </Head>
      <PostContentRichObject query={data.backgroundPost?.edges[0]?.node} />
    </>
  )
}
