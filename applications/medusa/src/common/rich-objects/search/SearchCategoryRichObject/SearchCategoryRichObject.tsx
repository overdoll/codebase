import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchCategoryRichObjectFragment$key } from '@//:artifacts/SearchCategoryRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  TITLE_SEARCH_PREFIX,
  TITLE_SUFFIX
} from '@//:modules/constants/rich-objects'
import ResourceRichObject from './ResourceRichObject/ResourceRichObject'

interface Props {
  query: SearchCategoryRichObjectFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryRichObjectFragment on Category {
    slug
    title
    thumbnail {
      ...ResourceRichObjectFragment
    }
  }
`

export default function SearchCategoryRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${TITLE_SEARCH_PREFIX} ${data.title} ${TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.title}} ${DESCRIPTION_FEATURES} on overdoll.com. ${DESCRIPTION_CONTENT_DISCOVER}.`

  const URL = `https://overdoll.com/search/category/${data.slug}}`

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