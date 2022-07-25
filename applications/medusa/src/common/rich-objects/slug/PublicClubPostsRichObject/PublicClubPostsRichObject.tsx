import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicClubPostsRichObjectFragment$key } from '@//:artifacts/PublicClubPostsRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SEARCH_PREFIX,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'

interface Props {
  clubQuery: PublicClubPostsRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicClubPostsRichObjectFragment on Club {
    slug
    name
  }
`

export default function PublicClubPostsRichObject ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(Fragment, clubQuery)

  // TODO add search terms to the search title
  // TODo a separate query that queries the url params with the tags and outputs them here as words with prioritization and removable on search
  // TODO also a post image rich object preview
  const TITLE = `${TITLE_SEARCH_PREFIX} ${clubData.name}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${clubData.name}'s ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER} from ${clubData.name}.`

  const URL = `https://overdoll.com/${clubData.slug}/posts?sortBy=TOP`

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
    </>
  )
}
