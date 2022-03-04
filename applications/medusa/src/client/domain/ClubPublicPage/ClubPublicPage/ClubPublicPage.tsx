import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubPublicPageQuery } from '@//:artifacts/ClubPublicPageQuery.graphql'
import { graphql } from 'react-relay'
import LargeClubHeader from '../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import StatisticNumber from '../../ManageClub/components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import JoinClubButton from './components/JoinClubButton/JoinClubButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { ClubMembers } from '@//:assets/icons/interface'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubMenu from './components/ClubMenu/ClubMenu'
import ClubTopPosts from './components/ClubTopPosts/ClubTopPosts'
import ClubExclusivePosts from './components/ClubExclusivePosts/ClubExclusivePosts'
import SupportClubButton from './components/SupportClubButton/SupportClubButton'

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
      ...JoinClubButtonClubFragment
      ...ClubMenuFragment
      ...ClubTopPostsFragment
      ...ClubExclusivePostsFragment
      ...SupportClubButtonClubFragment
    }
    viewer {
      ...JoinClubButtonViewerFragment
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
        <JoinClubButton
          w='100%'
          size='lg'
          colorScheme='gray'
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
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Become a supporter and get access to the club's exclusive content!
              </Trans>
            </Text>
          </Box>
          <SupportClubButton clubQuery={queryData?.club} viewerQuery={queryData?.viewer} />
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
