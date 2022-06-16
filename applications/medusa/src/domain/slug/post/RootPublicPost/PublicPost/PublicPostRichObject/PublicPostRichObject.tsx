import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostRichObjectFragment$key } from '@//:artifacts/PublicPostRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject from './PostContentRichObject/PostContentRichObject'

interface Props {
  query: PublicPostRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicPostRichObjectFragment on Post {
    reference
    club {
      name
      slug
    }
    characters {
      name
    }
    ...PostContentRichObjectFragment
  }
`

export default function PublicPostRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const getCharacterNames = (): string => {
    if (data.characters.length === 1) {
      return data.characters[0].name
    }
    return ((data.characters as Array<{ name: string }>).map((item) => item.name)).join(', ')
  }

  const ogTitle = `${getCharacterNames()} by ${data.club.name} - overdoll.com/${data.club.slug}`

  const ogUrl = `https://overdoll.com/${data.club.slug}/post/${data.reference}`

  return (
    <>
      <Head>
        <title>
          {ogTitle}
        </title>
        <meta property='og:title' content={`Post by ${data.club.name} on overdoll.com/${data.club.slug}`} />
        <meta property='og:description' content={`${getCharacterNames()} posted by ${data.club.name}`} />
        <meta property='og:url' content={ogUrl} />
      </Head>
      <PostContentRichObject query={data} />
    </>
  )
}
