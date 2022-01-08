import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewClubQuery } from '@//:artifacts/ViewClubQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import LargeClubHeader from '../../../MyClubs/components/LargeClubHeader/LargeClubHeader'
import { Avatar, AvatarGroup, HStack, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../../MyClubs/components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'

interface Props {
  query: PreloadedQuery<ViewClubQuery>
}

const Query = graphql`
  query ViewClubQuery($slug: String!) {
    club(slug: $slug) {
      membersCount
      members(first: 5, orderBy: {field: JOINED_AT}) {
        edges {
          node {
            account {
              avatar
            }
          }
        }
      }
      ...LargeClubHeaderFragment
    }
  }
`

export default function ViewClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewClubQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  if (queryData.club == null) {
    history.push('/')
  }

  const { i18n } = useLingui()

  const number = abbreviateNumber(queryData?.club?.membersCount ?? 0, 3)

  return (
    <Stack spacing={8}>
      <LargeClubHeader query={queryData?.club} />
      <HStack spacing={4}>
        <StatisticNumber value={number} text={i18n._(t`Members`)} />
        <AvatarGroup>
          {queryData?.club?.members.edges.map((item, index) =>
            <Avatar borderRadius='25%' key={index} src={item.node.account.avatar} />)}
        </AvatarGroup>
      </HStack>
    </Stack>
  )
}
