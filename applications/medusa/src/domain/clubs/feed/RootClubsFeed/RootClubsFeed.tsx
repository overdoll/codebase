import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultClubsFeedQuery as ResultClubsFeedQueryType } from '@//:artifacts/ResultClubsFeedQuery.graphql'
import ResultClubsFeedQuery from '@//:artifacts/ResultClubsFeedQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeClubsFeed from './DisposeClubsFeed/DisposeClubsFeed'

interface Props {
  queryRefs: {
    clubsFeedQuery: PreloadedQuery<ResultClubsFeedQueryType>
  }
}

const RootClubsFeed: PageProps<Props> = (props: Props) => {
  const { queryRefs: { clubsFeedQuery } } = props

  const params = useQueryLoader(
    ResultClubsFeedQuery,
    clubsFeedQuery
  )

  return (
    <PageContainer>
      <DisposeClubsFeed params={params} />
    </PageContainer>
  )
}

export default RootClubsFeed
