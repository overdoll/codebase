import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchSeriesFragment$key } from '@//:artifacts/ContainerSearchSeriesFragment.graphql'
import { ContainerSearchSeriesViewerFragment$key } from '@//:artifacts/ContainerSearchSeriesViewerFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchSeries from './HeaderSearchSeries/HeaderSearchSeries'
import ScrollSearchSeries from './ScrollSearchSeries/ScrollSearchSeries'

interface Props {
  seriesQuery: ContainerSearchSeriesFragment$key
}

const SeriesFragment = graphql`
  fragment ContainerSearchSeriesFragment on Series {
    ...HeaderSearchSeriesFragment
    ...ScrollSearchSeriesFragment
  }
`

export default function ContainerSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchSeries seriesQuery={seriesData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchSeries seriesQuery={seriesData} />
      </ContentContainer>
    </>
  )
}
