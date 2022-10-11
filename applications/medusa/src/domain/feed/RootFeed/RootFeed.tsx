import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultFeedQuery as ResultFeedQueryType } from '@//:artifacts/ResultFeedQuery.graphql'
import ResultFeedQuery from '@//:artifacts/ResultFeedQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeFeed from './DisposeFeed/DisposeFeed'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'

interface Props {
  queryRefs: {
    feedQuery: PreloadedQuery<ResultFeedQueryType>
  }
}

const RootFeed: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { feedQuery } } = props

  const params = useQueryLoader(
    ResultFeedQuery,
    feedQuery
  )

  return (
    <PageContainer>
      <RootStructuredData />
      <DisposeFeed params={params} />
    </PageContainer>
  )
}

export default RootFeed
