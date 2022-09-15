import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ResultCreatePostQuery, { ResultCreatePostQuery as ResultCreatePostQueryType } from '@//:artifacts/ResultCreatePostQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeCreatePost from './DisposeCreatePost/DisposeCreatePost'

interface Props {
  queryRefs: {
    postCreatorQuery: PreloadedQuery<ResultCreatePostQueryType>
  }
}

const RootCreatePost: PageProps<Props> = (props: Props) => {
  const { queryRefs: { postCreatorQuery } } = props

  const params = useQueryLoader<ResultCreatePostQueryType>(
    ResultCreatePostQuery,
    postCreatorQuery
  )

  return (
    <PageContainer>
      <DisposeCreatePost params={params} />
    </PageContainer>
  )
}

export default RootCreatePost
