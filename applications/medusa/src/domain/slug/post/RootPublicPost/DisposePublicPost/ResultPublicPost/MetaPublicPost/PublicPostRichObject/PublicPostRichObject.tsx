import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostRichObjectFragment$key } from '@//:artifacts/PublicPostRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject from '@//:common/rich-objects/default/PostRichObject/PostContentRichObject'
import { getPostDescription, getPostTitle } from '@//:modules/support/metaHelpers'

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

  const characters = data.characters.map((item) => item.name)

  const TITLE = getPostTitle(characters, data.club.name)

  const DESCRIPTION = getPostDescription(characters, data.club.name)

  const URL = `https://overdoll.com/${data.club.slug}/post/${data.reference}`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <meta
          property='og:description'
          content={DESCRIPTION}
        />
        <meta
          property='og:url'
          content={URL}
        />
        <link
          rel='canonical'
          href={URL}
        />
      </Head>
      <PostContentRichObject query={data} />
    </>
  )
}
