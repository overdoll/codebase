import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicClubRichObjectFragment$key } from '@//:artifacts/PublicClubRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_TYPES,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ResourceRichObject from '@//:common/rich-objects/default/ResourceRichObject/ResourceRichObject'

interface Props {
  query: PublicClubRichObjectFragment$key
}

const Fragment = graphql`
  fragment PublicClubRichObjectFragment on Club {
    slug
    name
    banner {
      ...ResourceRichObjectFragment
    }
  }
`

export const getClubDescription = (name: string): string => {
  return `${DESCRIPTION_PREFIX} ${name}'s ${DESCRIPTION_FEATURES} on ${TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_TYPES} from ${name}.`
}

export const getClubTitle = (name: string): string => {
  return `${name}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
}

export default function PublicClubRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = getClubTitle(data.name)
  const DESCRIPTION = getClubDescription(data.name)

  const URL = `https://overdoll.com/${data.slug}`

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
      <ResourceRichObject query={data.banner} />
    </>
  )
}
