import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchSeriesFragment$key } from '@//:artifacts/ContainerSearchSeriesFragment.graphql'
import { ContainerSearchSeriesAccountFragment$key } from '@//:artifacts/ContainerSearchSeriesAccountFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchSeries from './HeaderSearchSeries/HeaderSearchSeries'
import ScrollSearchSeries from './ScrollSearchSeries/ScrollSearchSeries'

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
      <MobileContainer pt={2}>
        <HeaderSearchSeries seriesQuery={seriesData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchSeries accountQuery={accountData} seriesQuery={seriesData} />
      </ContentContainer>
    </>
  )
}
