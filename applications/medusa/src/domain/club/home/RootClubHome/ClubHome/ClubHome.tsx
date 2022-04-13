import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubHomeQuery } from '@//:artifacts/ClubHomeQuery.graphql'
import LargeClubHeader from './LargeClubHeader/LargeClubHeader'
import { Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import StatisticNumber from './StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { ClubMembers } from '@//:assets/icons/interface'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import Head from 'next/head'

interface Props {
  query: PreloadedQuery<ClubHomeQuery>
}

const Query = graphql`
  query ClubHomeQuery($slug: String!) {
    club(slug: $slug) {
      name
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
    <>
      <Head>
        <title>
          Manage {queryData.club.name} :: overdoll.com
        </title>
      </Head>
      <Stack spacing={8}>
        <LargeClubHeader query={queryData?.club} />
        <StatisticNumber
          value={number}
          text={i18n._(t`Members`)}
          icon={ClubMembers}
        />
      </Stack>
    </>
  )
}
