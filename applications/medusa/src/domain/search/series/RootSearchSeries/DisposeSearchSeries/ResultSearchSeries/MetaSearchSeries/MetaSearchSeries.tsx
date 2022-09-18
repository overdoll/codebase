import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchSeriesFragment$key } from '@//:artifacts/MetaSearchSeriesFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import SearchSeriesRichObject from './SearchSeriesRichObject/SearchSeriesRichObject'
import ContainerSearchSeries from './ContainerSearchSeries/ContainerSearchSeries'

interface Props {
  seriesQuery: MetaSearchSeriesFragment$key
}

const SeriesFragment = graphql`
  fragment MetaSearchSeriesFragment on Series {
    ...SearchSeriesRichObjectFragment
    ...ContainerSearchSeriesFragment
  }
`

export default function MetaSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)

  return (
    <>
      <SearchSeriesRichObject query={seriesData} />
      <GlobalVideoManagerProvider>
        <ContainerSearchSeries seriesQuery={seriesData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
