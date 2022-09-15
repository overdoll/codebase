import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultRandomQuery as ResultRandomQueryType } from '@//:artifacts/ResultRandomQuery.graphql'
import ResultRandomQuery from '@//:artifacts/ResultRandomQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeRandom from './DisposeRandom/DisposeRandom'

interface Props {
  queryRefs: {
    randomQuery: PreloadedQuery<ResultRandomQueryType>
  }
}

const RootRandom: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { randomQuery } } = props

  const params = useQueryLoader(
    ResultRandomQuery,
    randomQuery
  )

  return (
    <PageContainer>
      <DisposeRandom params={params} />
    </PageContainer>
  )
}

export default RootRandom
