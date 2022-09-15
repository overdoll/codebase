import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchSeriesFragment$key } from '@//:artifacts/MetaSearchSeriesFragment.graphql'
import { MetaSearchSeriesViewerFragment$key } from '@//:artifacts/MetaSearchSeriesViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import SearchSeriesRichObject from './SearchSeriesRichObject/SearchSeriesRichObject'
import ContainerSearchSeries from './ContainerSearchSeries/ContainerSearchSeries'

interface Props {
  seriesQuery: MetaSearchSeriesFragment$key
  viewerQuery: MetaSearchSeriesViewerFragment$key | null
}

const SeriesFragment = graphql`
  fragment MetaSearchSeriesFragment on Series {
    ...SearchSeriesRichObjectFragment
    ...ContainerSearchSeriesFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaSearchSeriesViewerFragment on Account {
    ...ContainerSearchSeriesViewerFragment
  }
`

export default function MetaSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    viewerQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <SearchSeriesRichObject query={seriesData} />
      <GlobalVideoManagerProvider>
        <ContainerSearchSeries seriesQuery={seriesData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
