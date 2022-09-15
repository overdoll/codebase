import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchSeriesFragment$key } from '@//:artifacts/ContainerSearchSeriesFragment.graphql'
import { ContainerSearchSeriesViewerFragment$key } from '@//:artifacts/ContainerSearchSeriesViewerFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchSeries from './HeaderSearchSeries/HeaderSearchSeries'
import ScrollSearchSeries from './ScrollSearchSeries/ScrollSearchSeries'

interface Props {
  seriesQuery: ContainerSearchSeriesFragment$key
  viewerQuery: ContainerSearchSeriesViewerFragment$key | null
}

const SeriesFragment = graphql`
  fragment ContainerSearchSeriesFragment on Series {
    ...HeaderSearchSeriesFragment
    ...ScrollSearchSeriesFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerSearchSeriesViewerFragment on Account {
    ...ScrollSearchSeriesViewerFragment
  }
`

export default function ContainerSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    viewerQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchSeries seriesQuery={seriesData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchSeries seriesQuery={seriesData} viewerQuery={viewerData} />
      </ContentContainer>
    </>
  )
}
