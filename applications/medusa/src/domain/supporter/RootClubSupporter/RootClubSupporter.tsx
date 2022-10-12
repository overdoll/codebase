import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  ResultClubSupporterQuery as ResultClubSupporterQueryType
} from '@//:artifacts/ResultClubSupporterQuery.graphql'
import ResultClubSupporterQuery from '@//:artifacts/ResultClubSupporterQuery.graphql'
import { PageContainer } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import DisposeClubSupporter from './DisposeClubSupporter/DisposeClubSupporter'

interface Props {
  queryRefs: {
    clubSupporterQuery: PreloadedQuery<ResultClubSupporterQueryType>
  }
}

const RootClubSupporter: PageProps<Props> = (props: Props) => {
  const { queryRefs: { clubSupporterQuery } } = props

  const params = useQueryLoader(
    ResultClubSupporterQuery,
    clubSupporterQuery
  )

  return (
    <PageContainer>
      <DisposeClubSupporter params={params} />
    </PageContainer>
  )
}

export default RootClubSupporter
