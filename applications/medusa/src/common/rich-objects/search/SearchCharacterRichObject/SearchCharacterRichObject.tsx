import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchCharacterRichObjectFragment$key } from '@//:artifacts/SearchCharacterRichObjectFragment.graphql'
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
import ResourceRichObject from '../SearchCategoryRichObject/ResourceRichObject/ResourceRichObject'

interface Props {
  query: SearchCharacterRichObjectFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterRichObjectFragment on Character {
    slug
    name
    series {
      slug
    }
    thumbnail {
      ...ResourceRichObjectFragment
    }
  }
`

export default function SearchCharacterRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${TITLE_SEARCH_PREFIX} ${data.name} ${TITLE_FEATURES} ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.name} ${DESCRIPTION_FEATURES} on overdoll.com. ${DESCRIPTION_CONTENT_DISCOVER} of ${data.name}.`

  const URL = `https://overdoll.com/search/series/${data.series.slug}/${data.slug}`

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
      <ResourceRichObject query={data.thumbnail} />
    </>
  )
}
