import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ResultBrowseSeriesQuery, {
  ResultBrowseSeriesQuery as ResultBrowseSeriesQueryType
} from '@//:artifacts/ResultBrowseSeriesQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeBrowseSeries from './DisposeBrowseSeries/DisposeBrowseSeries'

interface Props {
  queryRefs: {
    browseSeriesQuery: PreloadedQuery<ResultBrowseSeriesQueryType>
  }
}

const RootBrowseSeries: PageProps<Props> = (props: Props) => {
  const { queryRefs: { browseSeriesQuery } } = props

  const params = useQueryLoader<ResultBrowseSeriesQueryType>(
    ResultBrowseSeriesQuery,
    browseSeriesQuery
  )

  return (
    <PageContainer>
      <DisposeBrowseSeries params={params} />
    </PageContainer>
  )
}

export default RootBrowseSeries
