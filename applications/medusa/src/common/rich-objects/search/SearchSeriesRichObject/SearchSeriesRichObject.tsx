import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchSeriesRichObjectFragment$key } from '@//:artifacts/SearchSeriesRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_FEATURES,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ResourceRichObject from '../SearchCategoryRichObject/ResourceRichObject/ResourceRichObject'

interface Props {
  query: SearchSeriesRichObjectFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesRichObjectFragment on Series {
    slug
    title
    thumbnail {
      ...ResourceRichObjectFragment
    }
  }
`

export default function SearchSeriesRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${data.title} ${TITLE_FEATURES} ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.title} ${DESCRIPTION_FEATURES} on overdoll.com. ${DESCRIPTION_CONTENT_DISCOVER} of ${data.title}.`

  const URL = `https://overdoll.com/search/series/${data.slug}`

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
