import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchSeriesFragment$key } from '@//:artifacts/MetaSearchSeriesFragment.graphql'
import { MetaSearchSeriesAccountFragment$key } from '@//:artifacts/MetaSearchSeriesAccountFragment.graphql'
import SearchSeriesRichObject from './SearchSeriesRichObject/SearchSeriesRichObject'
import ContainerSearchSeries from './ContainerSearchSeries/ContainerSearchSeries'

interface Props {
  seriesQuery: MetaSearchSeriesFragment$key
  accountQuery: MetaSearchSeriesAccountFragment$key | null

}

const SeriesFragment = graphql`
  fragment MetaSearchSeriesFragment on Series {
    ...SearchSeriesRichObjectFragment
    ...ContainerSearchSeriesFragment
  }
`

const AccountFragment = graphql`
  fragment MetaSearchSeriesAccountFragment on Account {
    ...ContainerSearchSeriesAccountFragment
  }
`

export default function MetaSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    accountQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)
  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      <SearchSeriesRichObject query={seriesData} />
      <ContainerSearchSeries accountQuery={accountData} seriesQuery={seriesData} />
    </>
  )
}
