import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultLikedPostsQuery as ResultLikedPostsQueryType } from '@//:artifacts/ResultLikedPostsQuery.graphql'
import ResultLikedPostsQuery from '@//:artifacts/ResultLikedPostsQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeLikedPosts from './DisposeLikedPosts/DisposeLikedPosts'

interface Props {
  queryRefs: {
    likedPostsQuery: PreloadedQuery<ResultLikedPostsQueryType>
  }
}

const RootLikedPosts: PageProps<Props> = (props: Props) => {
  const { queryRefs: { likedPostsQuery } } = props

  const params = useQueryLoader(
    ResultLikedPostsQuery,
    likedPostsQuery
  )

  return (
    <PageContainer>
      <DisposeLikedPosts params={params} />
    </PageContainer>
  )
}

export default RootLikedPosts
