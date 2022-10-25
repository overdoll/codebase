import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultPublicClubPostsQuery as ResultPublicClubPostsQueryType } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import ResultPublicClubPostsQuery from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposePublicClubPosts from './DisposePublicClubPosts/DisposePublicClubPosts'

interface Props {
  queryRefs: {
    publicClubPosts: PreloadedQuery<ResultPublicClubPostsQueryType>
  }
}

const RootPublicClubPosts: PageProps<Props> = (props: Props) => {
  const { queryRefs: { publicClubPosts } } = props

  const params = useQueryLoader(
    ResultPublicClubPostsQuery,
    publicClubPosts
  )

  return (
    <PageContainer>
      <DisposePublicClubPosts params={params} />
    </PageContainer>
  )
}

export default RootPublicClubPosts
