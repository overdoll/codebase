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
import MediaRichObject from '@//:common/rich-objects/default/MediaRichObject/MediaRichObject'

interface Props {
  clubQuery: PublicClubPostsRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicClubPostsRichObjectFragment on Club {
    slug
    name
    bannerMedia {
      ...MediaRichObjectFragment
    }
  }
`

export default function PublicClubPostsRichObject ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(Fragment, clubQuery)

  const TITLE = `${TITLE_SEARCH_PREFIX} ${clubData.name}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${clubData.name}'s ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER} from ${clubData.name}.`

  const URL = `https://overdoll.com/${clubData.slug}/posts`

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
      <MediaRichObject query={clubData.bannerMedia} />
    </>
  )
}
