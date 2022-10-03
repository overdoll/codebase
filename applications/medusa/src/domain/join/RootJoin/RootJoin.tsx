import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultJoinQuery as ResultJoinQueryType } from '@//:artifacts/ResultJoinQuery.graphql'
import ResultJoinQuery from '@//:artifacts/ResultJoinQuery.graphql'
import { PageProps } from '@//:types/app'
import JoinRichObject from '../../../common/rich-objects/join/JoinRichObject/JoinRichObject'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeJoin from './DisposeJoin/DisposeJoin'

interface Props {
  queryRefs: {
    joinQuery: PreloadedQuery<ResultJoinQueryType>
  }
}

const RootJoin: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { joinQuery } } = props

  const params = useQueryLoader<ResultJoinQueryType>(
    ResultJoinQuery,
    joinQuery
  )

  return (
    <>
      <JoinRichObject />
      <PageContainer>
        <DisposeJoin params={params} />
      </PageContainer>
    </>
  )
}

export default RootJoin
