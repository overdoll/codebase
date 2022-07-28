import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchCategoryRichObjectFragment$key } from '@//:artifacts/SearchCategoryRichObjectFragment.graphql'
import Head from 'next/head'
import React from 'react'
import {
  DESCRIPTION_CONTENT_DISCOVER,
  DESCRIPTION_FEATURES,
  DESCRIPTION_PREFIX,
  SEARCH_TITLE_SUFFIX,
  TITLE_FEATURES
} from '@//:modules/constants/rich-objects'
import ResourceRichObject from '../../default/ResourceRichObject/ResourceRichObject'

interface Props {
  query: SearchCategoryRichObjectFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryRichObjectFragment on Category {
    slug
    title
    banner {
      ...ResourceRichObjectFragment
    }
  }
`

export default function SearchCategoryRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const TITLE = `${data.title} ${TITLE_FEATURES} - ${SEARCH_TITLE_SUFFIX}`
  const DESCRIPTION = `${DESCRIPTION_PREFIX} ${data.title} ${DESCRIPTION_FEATURES} on ${SEARCH_TITLE_SUFFIX}. ${DESCRIPTION_CONTENT_DISCOVER} of ${data.title}.`

  const URL = `https://overdoll.com/search/category/${data.slug}`

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
      </Head>
      <ResourceRichObject query={data.banner} />
    </>
  )
}
