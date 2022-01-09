import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewClubQuery } from '@//:artifacts/ViewClubQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import LargeClubHeader from '../../../MyClubs/components/LargeClubHeader/LargeClubHeader'
import { Avatar, AvatarGroup, HStack, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../../MyClubs/components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'
import Button from '@//:modules/form/Button/Button'
import becomeClubMember from '../../../MyClubs/queries/becomeClubMember/becomeClubMember'
import withdrawClubMembership from '../../../MyClubs/queries/withdrawClubMembership/withdrawClubMembership'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import PublicClubPosts from '../../../MyClubs/components/PublicClubPosts/PublicClubPosts'

interface Props {
  query: PreloadedQuery<ViewClubQuery>
}

const Query = graphql`
  query ViewClubQuery($slug: String!) {
    club(slug: $slug) {
      id
      membersCount
      viewerMember {
        __typename
      }
      members(first: 4, orderBy: {field: JOINED_AT}) {
        edges {
          node {
            account {
              avatar
            }
          }
        }
      }
      ...LargeClubHeaderFragment
      ...PublicClubPostsFragment
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

  const isMember = queryData?.club?.viewerMember !== null

  const [becomeMember, isBecomingMember] = becomeClubMember(queryData?.club?.id as string)
  const [withdrawMembership, isWithdrawingMembership] = withdrawClubMembership(queryData?.club?.id as string)

  const AddAvatars = (): JSX.Element => {
    if (queryData?.club?.members.edges == null) return <></>

    const placeholderLength = 4 - queryData?.club?.members.edges.length

    return (
      <AvatarGroup spacing={-8}>
        {queryData?.club?.members.edges.map((item, index) =>
          <Avatar w={24} h={24} borderRadius='25%' key={index} src={item.node.account.avatar} />)}
        {[...Array(placeholderLength).keys()].map((item, index) =>
          <Avatar
            w={24}
            h={24}
            borderRadius='25%'
            key={index}
          />)}
      </AvatarGroup>
    )
  }

  return (
    <Stack spacing={12}>
      <LargeClubHeader query={queryData?.club} />
      <Stack spacing={4}>
        <HStack spacing={8}>
          <StatisticNumber value={number} text={i18n._(t`Members`)} />
          <AddAvatars />
        </HStack>
        {isMember
          ? <Button onClick={withdrawMembership} isLoading={isWithdrawingMembership} size='xl' colorScheme='gray'>
            <Trans>
              Leave this club
            </Trans>
          </Button>
          : <Button onClick={becomeMember} isLoading={isBecomingMember} size='xl' colorScheme='orange'>
            <Trans>
              Join this club
            </Trans>
          </Button>}
      </Stack>
      <Stack spacing={2}>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            Top posts from this club
          </PageSectionTitle>
        </PageSectionWrap>
        <PublicClubPosts query={queryData?.club} />
      </Stack>
    </Stack>
  )
}
