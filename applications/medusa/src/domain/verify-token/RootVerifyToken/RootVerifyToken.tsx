import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultVerifyTokenQuery as ResultVerifyTokenQueryType } from '@//:artifacts/ResultVerifyTokenQuery.graphql'
import ResultVerifyTokenQuery from '@//:artifacts/ResultVerifyTokenQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeVerifyToken from './DisposeVerifyToken/DisposeVerifyToken'
import VerifyTokenRichObject from './VerifyTokenRichObject/VerifyTokenRichObject'

interface Props {
  queryRefs: {
    verifyTokenQuery: PreloadedQuery<ResultVerifyTokenQueryType>
  }
}

const RootVerifyToken: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { verifyTokenQuery } } = props

  const params = useQueryLoader<ResultVerifyTokenQueryType>(
    ResultVerifyTokenQuery,
    verifyTokenQuery
  )

  return (
    <>
      <VerifyTokenRichObject />
      <PageContainer>
        <DisposeVerifyToken params={params} />
      </PageContainer>
    </>
  )
}

export default RootVerifyToken
