import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewClubQuery } from '@//:artifacts/ViewClubQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import LargeClubHeader from '../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { Avatar, AvatarGroup, Flex, HStack, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../../ManageClub/components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import PublicClubPosts from '../../../ManageClub/components/PublicClubPosts/PublicClubPosts'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'

interface Props {
  query: PreloadedQuery<ViewClubQuery>
}

const Query = graphql`
  query ViewClubQuery($slug: String!) {
    club(slug: $slug) {
      membersCount
      members(first: 4, orderBy: {field: JOINED_AT}) {
        edges {
          node {
            account {
              avatar {
                ...ResourceIconFragment
              }
            }
          }
        }
      }
      ...LargeClubHeaderFragment
      ...PublicClubPostsFragment
      ...JoinClubButtonClubFragment
    }
    viewer {
      ...JoinClubButtonViewerFragment
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

  const AddAvatars = (): JSX.Element => {
    if (queryData?.club?.members.edges == null) return <></>

    const placeholderLength = 4 - queryData?.club?.members.edges.length

    return (
      <AvatarGroup spacing={-8}>
        {queryData?.club?.members.edges.map((item, index) =>
          <ResourceIcon key={index} w={24} h={24} query={item.node.account.avatar} />)}
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
      <Flex align='center' justify='space-between'>
        <LargeClubHeader query={queryData?.club} />
        <JoinClubButton
          clubQuery={queryData?.club}
          viewerQuery={queryData?.viewer}
        />
      </Flex>
      <Stack spacing={4}>
        <HStack spacing={8}>
          <StatisticNumber value={number} text={i18n._(t`Members`)} />
          <AddAvatars />
        </HStack>

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
