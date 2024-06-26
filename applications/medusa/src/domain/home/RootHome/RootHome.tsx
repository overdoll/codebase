import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultHomeQuery as ResultHomeQueryType } from '@//:artifacts/ResultHomeQuery.graphql'
import ResultHomeQuery from '@//:artifacts/ResultHomeQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeHome from './DisposeHome/DisposeHome'
import PatternHome from './DisposeHome/ResultHome/MetaHome/ContainerHome/PatternHome/PatternHome'

interface Props {
  queryRefs: {
    homeQuery: PreloadedQuery<ResultHomeQueryType>
  }
}

const RootHome: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { homeQuery } } = props

  const params = useQueryLoader(
    ResultHomeQuery,
    homeQuery
  )

  return (
    <PageContainer
      pattern={<PatternHome />}
    >
      <DisposeHome params={params} />
    </PageContainer>
  )
}

export default RootHome
