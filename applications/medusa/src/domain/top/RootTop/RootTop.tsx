import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultTopQuery as ResultTopQueryType } from '@//:artifacts/ResultTopQuery.graphql'
import ResultTopQuery from '@//:artifacts/ResultTopQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeTop from './DisposeTop/DisposeTop'

interface Props {
  queryRefs: {
    browseQuery: PreloadedQuery<ResultTopQueryType>
  }
}

const RootTop: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { browseQuery } } = props

  const params = useQueryLoader(
    ResultTopQuery,
    browseQuery
  )

  return (
    <PageContainer>
      <DisposeTop params={params} />
    </PageContainer>
  )
}

export default RootTop
