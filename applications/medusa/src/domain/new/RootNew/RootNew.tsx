import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultNewQuery as ResultNewQueryType } from '@//:artifacts/ResultNewQuery.graphql'
import ResultNewQuery from '@//:artifacts/ResultNewQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeNew from './DisposeNew/DisposeNew'

interface Props {
  queryRefs: {
    browseQuery: PreloadedQuery<ResultNewQueryType>
  }
}

const RootNew: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { browseQuery } } = props

  const params = useQueryLoader(
    ResultNewQuery,
    browseQuery
  )

  return (
    <PageContainer>
      <DisposeNew params={params} />
    </PageContainer>
  )
}

export default RootNew
