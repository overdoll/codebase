import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostRichObjectFragment$key } from '@//:artifacts/PublicPostRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject from './PostContentRichObject/PostContentRichObject'
import {
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'

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

  const TITLE = `${getCharacterNames()} From ${data.club.name}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`

  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${getCharacterNames()} ${DESCRIPTION_FEATURES} by ${data.club.name} on ${TITLE_SUFFIX}`

  const URL = `https://overdoll.com/${data.club.slug}/post/${data.reference}`

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
          property='description'
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
      <PostContentRichObject query={data} />
    </>
  )
}
