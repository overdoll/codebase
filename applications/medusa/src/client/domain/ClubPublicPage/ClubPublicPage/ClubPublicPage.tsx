import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubPublicPageQuery } from '@//:artifacts/ClubPublicPageQuery.graphql'
import { graphql } from 'react-relay'
import LargeClubHeader from '../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { Box, Flex, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../ManageClub/components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import abbreviateNumber from '@//:modules/support/abbreviateNumber'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { ClubMembers } from '@//:assets/icons/interface'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubMenu from './ClubMenu/ClubMenu'
import ClubTopPosts from './ClubTopPosts/ClubTopPosts'
import ClubExclusivePosts from './ClubExclusivePosts/ClubExclusivePosts'
import SupportClubButton from './SupportClubButton/SupportClubButton'
import JoinClubFromPage from './JoinClubButton/JoinClubFromPage/JoinClubFromPage'

interface Props {
  query: PreloadedQuery<ClubPublicPageQuery>
}

const Query = graphql`
  query ClubPublicPageQuery($slug: String!) {
    club(slug: $slug) {
      membersCount
      backgroundPost: posts(first: 1) {
        edges {
          node {
            content {
              resource {
                ...ResourceItemFragment
              }

            }
          }
        }
      }
      ...LargeClubHeaderFragment
      ...JoinClubFromPageFragment
      ...ClubMenuFragment
      ...ClubTopPostsFragment
      ...ClubExclusivePostsFragment
      ...SupportClubButtonClubFragment
    }
    viewer {
      ...JoinClubFromPageViewerFragment
      ...SupportClubButtonViewerFragment
    }
  }
`

export default function ClubPublicPage (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPublicPageQuery>(
    Query,
    props.query
  )

  const { i18n } = useLingui()

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  const number = abbreviateNumber(queryData?.club?.membersCount ?? 0, 3)

  return (
    <Stack spacing={8}>
      <Box h={200}>
        <TileOverlay
          backdrop={(
            <ResourceItem
              query={queryData?.club?.backgroundPost?.edges[0]?.node?.content[0].resource ?? null}
            />)}
        >
          <Flex h='100%' w='100%' align='center' justify='center' position='relative'>
            <LargeClubHeader query={queryData?.club} />
            <Flex top={0} right={0} position='absolute'>
              <ClubMenu query={queryData?.club} />
            </Flex>
          </Flex>
        </TileOverlay>
      </Box>
      <Stack align='center' spacing={2}>
        <StatisticNumber
          colorScheme='orange'
          value={number}
          text={i18n._(t`Members`)}
          icon={ClubMembers}
        />
        <JoinClubFromPage
          w='100%'
          size='lg'
          clubQuery={queryData?.club}
          viewerQuery={queryData?.viewer}
        />
      </Stack>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle colorScheme='orange'>
                Exclusive Posts
              </PageSectionTitle>
            </PageSectionWrap>
            <SupportClubButton clubQuery={queryData?.club} viewerQuery={queryData?.viewer} />
          </Box>
        </Stack>
        <ClubExclusivePosts query={queryData?.club} />
      </Stack>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            Top Posts
          </PageSectionTitle>
        </PageSectionWrap>
        <ClubTopPosts query={queryData?.club} />
      </Box>
    </Stack>
  )
}
