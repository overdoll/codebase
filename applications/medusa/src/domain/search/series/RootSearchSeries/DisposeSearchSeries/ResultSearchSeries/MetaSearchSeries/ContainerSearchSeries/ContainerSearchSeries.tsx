import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchSeriesFragment$key } from '@//:artifacts/ContainerSearchSeriesFragment.graphql'
import { ContainerSearchSeriesAccountFragment$key } from '@//:artifacts/ContainerSearchSeriesAccountFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchSeries from './HeaderSearchSeries/HeaderSearchSeries'
import ScrollSearchSeries from './ScrollSearchSeries/ScrollSearchSeries'
import dynamic from 'next/dynamic'

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

interface Props {
  seriesQuery: ContainerSearchSeriesFragment$key
  accountQuery: ContainerSearchSeriesAccountFragment$key | null
}

const SeriesFragment = graphql`
  fragment ContainerSearchSeriesFragment on Series {
    ...HeaderSearchSeriesFragment
    ...ScrollSearchSeriesFragment
  }
`

const AccountFragment = graphql`
  fragment ContainerSearchSeriesAccountFragment on Account {
    ...ScrollSearchSeriesAccountFragment
  }
`

export default function ContainerSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    accountQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)
  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      {accountData == null && (
        <>
          <LazyBanner />
          <LazyModal />
        </>
      )}
      <MobileContainer pt={2}>
        <HeaderSearchSeries seriesQuery={seriesData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchSeries accountQuery={accountData} seriesQuery={seriesData} />
      </ContentContainer>
    </>
  )
}
