import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  ResultSearchSeriesQuery as ResultSearchSeriesQueryType
} from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import ResultSearchSeriesQuery from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeSearchSeries from './DisposeSearchSeries/DisposeSearchSeries'

interface Props {
  queryRefs: {
    searchSeriesQuery: PreloadedQuery<ResultSearchSeriesQueryType>
  }
}

const RootSearchSeries: PageProps<Props> = (props: Props) => {
  const { queryRefs: { searchSeriesQuery } } = props

  const params = useQueryLoader<ResultSearchSeriesQueryType>(
    ResultSearchSeriesQuery,
    searchSeriesQuery
  )

  return (
    <PageContainer>
      <DisposeSearchSeries params={params} />
    </PageContainer>
  )
}

export default RootSearchSeries
