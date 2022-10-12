import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { DiscoverClubsQuery } from '@//:artifacts/DiscoverClubsQuery.graphql'
import { graphql } from 'react-relay'
import DiscoverClubsList
  from '@//:modules/content/HookedComponents/Filters/fragments/DiscoverClubsList/DiscoverClubsList'
import dynamic from 'next/dynamic'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { ContentBrushPen } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<DiscoverClubsQuery>
}

const Query = graphql`
  query DiscoverClubsQuery {
    viewer {
      __typename
    }
    ...DiscoverClubsListFragment
  }
`

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { ssr: false }
)

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { ssr: false }
)

export default function DiscoverClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<DiscoverClubsQuery>(
    Query,
    props.query
  )

  return (
    <>
      {queryData.viewer == null && (
        <>
          <LazyBanner />
          <LazyModal />
        </>
      )}
      <Stack spacing={2}>
        <PageHeader icon={ContentBrushPen} title={<Trans>Discover clubs</Trans>} />
        <DiscoverClubsList query={queryData} />
      </Stack>
    </>
  )
}
