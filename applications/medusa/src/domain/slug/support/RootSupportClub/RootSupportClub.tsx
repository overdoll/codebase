import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultPublicPostQuery as ResultPublicPostQueryType } from '@//:artifacts/ResultPublicPostQuery.graphql'
import ResultPublicPostQuery from '@//:artifacts/ResultPublicPostQuery.graphql'
import { PageContainer } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import SupportClub from './SupportClub/SupportClub'

interface Props {
  queryRefs: {
    supportClubQuery: PreloadedQuery<ResultPublicPostQueryType>
  }
}

// If we need to use nextjs page functions, we can keep this clean and define their usage here
const RootSupportClub: PageProps<Props> = (props: Props) => {
  const { queryRefs: { supportClubQuery } } = props

  const params = useQueryLoader(
    ResultPublicPostQuery,
    supportClubQuery
  )

  return (
    <>
      <PageContainer>
        <SupportClub params={params} />
      </PageContainer>
    </>

  )
}

export default RootSupportClub
