import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { PageContainer } from '@//:modules/content/PageLayout'
import React from 'react'
import ResultPublicClubQuery, { ResultPublicClubQuery as ResultPublicClubQueryType } from '@//:artifacts/ResultPublicClubQuery.graphql'
import { PageProps } from '@//:types/app'
import DisposePublicClub from './DisposePublicClub/DisposePublicClub'

interface Props {
  queryRefs: {
    publicClubQuery: PreloadedQuery<ResultPublicClubQueryType>
  }
}

const RootPublicClub: PageProps<Props> = (props: Props) => {
  const { queryRefs: { publicClubQuery } } = props

  const params = useQueryLoader(
    ResultPublicClubQuery,
    publicClubQuery
  )

  return (
    <PageContainer>
      <DisposePublicClub params={params} />
    </PageContainer>
  )
}

export default RootPublicClub
