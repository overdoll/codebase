import { SuggestedHomeFragment$key } from '@//:artifacts/SuggestedHomeFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Stack } from '@chakra-ui/react'
import RecommendedPostsGrid from './RecommendedPostsGrid/RecommendedPostsGrid'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import PopularTagsCards from './PopularTagsCards/PopularTagsCards'
import DiscoverClubsTiles from './DiscoverClubsTiles/DiscoverClubsTiles'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

interface Props {
  rootQuery: SuggestedHomeFragment$key
}

const Fragment = graphql`
  fragment SuggestedHomeFragment on Query {
    viewer {
      __typename
    }
    ...RecommendedPostsGridFragment
    ...PopularTagsCardsFragment
    ...DiscoverClubsTilesFragment
  }
`

export default function SuggestedHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <Suspense fallback={<></>}>
        {data.viewer == null && (
          <LazyBanner />
        )}
      </Suspense>
      <Stack pb={36} spacing={36}>
        <RecommendedPostsGrid rootQuery={data} />
        <PopularTagsCards rootQuery={data} />
        <DiscoverClubsTiles rootQuery={data} />
      </Stack>
    </>
  )
}
