import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostRichObjectFragment$key } from '@//:artifacts/PublicPostRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import PostContentRichObject from '../../default/PostContentRichObject/PostContentRichObject'
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

const getCharacterNames = (characters: string[]): string => {
  if (characters.length === 1) {
    return characters[0]
  }
  return characters.join(', ')
}

export const getPostTitle = (characters: string[], club: string): string => {
  return `${getCharacterNames(characters)} From ${club}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
}

export default function PublicPostRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const characters = data.characters.map((item) => item.name)

  const TITLE = getPostTitle(characters, data.club.name)

  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${getCharacterNames(characters)} ${DESCRIPTION_FEATURES} by ${data.club.name} on ${TITLE_SUFFIX}`

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
