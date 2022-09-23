import { graphql, useFragment } from 'react-relay/hooks'
import type {
  PublicClubCharacterRichObjectFragment$key
} from '@//:artifacts/PublicClubCharacterRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  SEARCH_TITLE_SUFFIX,
  TITLE_FEATURES
} from '@//:modules/constants/rich-objects'
import MediaRichObject from '@//:common/rich-objects/default/MediaRichObject/MediaRichObject'

interface Props {
  query: PublicClubCharacterRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicClubCharacterRichObjectFragment on Character {
    slug
    name
    club @required(action: THROW) {
      slug
      name
    }
    bannerMedia {
      ...MediaRichObjectFragment
    }
  }
`

export default function PublicClubCharacterRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${data.name} From ${data.club.name}'s ${TITLE_FEATURES} - ${SEARCH_TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.name} ${DESCRIPTION_FEATURES} by ${data.club.name} on ${SEARCH_TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER} of ${data.name}.`

  const URL = `https://overdoll.com/${data.club.slug}/character/${data.slug}`

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
      <MediaRichObject query={data.bannerMedia} />
    </>
  )
}
