import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubHomeQuery } from '@//:artifacts/ClubHomeQuery.graphql'
import LargeClubHeader from '../../../components/LargeClubHeader/LargeClubHeader'
import { Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import StatisticNumber from '../../../components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { ClubMembers } from '@//:assets/icons/interface'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ClubHomeQuery>
}

const Query = graphql`
  query ClubHomeQuery($slug: String!) {
    club(slug: $slug) {
      membersCount
      viewerIsOwner
      ...LargeClubHeaderFragment
    }
  }
`

export default function ClubHome ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubHomeQuery>(
    Query,
    query
  )

  const { i18n } = useLingui()

  const number = queryData?.club?.membersCount.toLocaleString() as string

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={8}>
      <LargeClubHeader query={queryData?.club} />
      <StatisticNumber
        value={number}
        text={i18n._(t`Members`)}
        icon={ClubMembers}
      />
    </Stack>
  )
}
