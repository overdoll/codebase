import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultLikesQuery as ResultLikesQueryType } from '@//:artifacts/ResultLikesQuery.graphql'
import ResultLikesQuery from '@//:artifacts/ResultLikesQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeLikes from './DisposeLikes/DisposeLikes'
import LikesRichObject from './LikesRichObject/LikesRichObject'

interface Props {
  queryRefs: {
    likesQuery: PreloadedQuery<ResultLikesQueryType>
  }
}

const RootLikes: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { likesQuery } } = props

  const params = useQueryLoader(
    ResultLikesQuery,
    likesQuery
  )

  return (
    <PageContainer>
      <LikesRichObject />
      <DisposeLikes params={params} />
    </PageContainer>
  )
}

export default RootLikes
