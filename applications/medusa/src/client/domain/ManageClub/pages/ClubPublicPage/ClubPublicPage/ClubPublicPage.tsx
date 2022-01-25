import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubPublicPageQuery } from '@//:artifacts/ClubPublicPageQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'
import LargeClubHeader from '../../../components/LargeClubHeader/LargeClubHeader'
import { Avatar, AvatarGroup, Box, HStack, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../../components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import JoinClubButton from '../../../components/JoinClubButton/JoinClubButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'

interface Props {
  query: PreloadedQuery<ClubPublicPageQuery>
}

const Query = graphql`
  query ClubPublicPageQuery($slug: String!) {
    club(slug: $slug) {
      membersCount
      members(first: 4, sortBy: NEWEST) {
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
      backgroundPost: posts(first: 1) {
        edges {
          node {
            content {
              ...ResourceItemFragment
            }
          }
        }
      }
      ...LargeClubHeaderFragment
      ...JoinClubButtonClubFragment
    }
    viewer {
      ...JoinClubButtonViewerFragment
    }
  }
`

export default function ClubPublicPage (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPublicPageQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  if (queryData?.club == null) {
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
      <Stack spacing={2}>
        <Box h={140}>
          <TileOverlay
            background={<ResourceItem query={queryData?.club?.backgroundPost?.edges[0]?.node?.content[0] ?? null} />}
          >
            <LargeClubHeader query={queryData?.club} />

          </TileOverlay>
        </Box>
        <JoinClubButton
          w='100%'
          clubQuery={queryData?.club}
          viewerQuery={queryData?.viewer}
        />
      </Stack>
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
        <></>
      </Stack>
    </Stack>
  )
}
