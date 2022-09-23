import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultPublicPostQuery as ResultPublicPostQueryType } from '@//:artifacts/ResultPublicPostQuery.graphql'
import ResultPublicPostQuery from '@//:artifacts/ResultPublicPostQuery.graphql'
import { PageContainer } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import DisposePublicPost from './DisposePublicPost/DisposePublicPost'

interface Props {
  queryRefs: {
    publicPostQuery: PreloadedQuery<ResultPublicPostQueryType>
  }
}

// If we need to use nextjs page functions, we can keep this clean and define their usage here
const RootPublicPost: PageProps<Props> = (props: Props) => {
  const { queryRefs: { publicPostQuery } } = props

  const params = useQueryLoader(
    ResultPublicPostQuery,
    publicPostQuery
  )

  return (
    <>
      <PageContainer>
        <DisposePublicPost params={params} />
      </PageContainer>
    </>

  )
}

export default RootPublicPost
