import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicClubQuery } from '@//:artifacts/PublicClubQuery.graphql'
import { graphql } from 'react-relay'
import LargeClubHeader from '../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { Box, Flex, Stack } from '@chakra-ui/react'
import StatisticNumber from './StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import abbreviateNumber from '@//:modules/support/abbreviateNumber'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { ClubMembers } from '@//:assets/icons/interface'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubMenu from './ClubMenu/ClubMenu'
import ClubTopPosts from './ClubTopPosts/ClubTopPosts'
import ClubExclusivePosts from './ClubExclusivePosts/ClubExclusivePosts'
import SupportClubButton from './SupportClubButton/SupportClubButton'
import JoinClubFromPage from './JoinClubButton/JoinClubFromPage/JoinClubFromPage'
import ClubSuspendedStaffAlert from './ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
import Head from 'next/head'
import LockedAccountBanner from '../../../../../common/components/LockedAccount/LockedAccountBanner/LockedAccountBanner'

interface Props {
  query: PreloadedQuery<PublicClubQuery>
}

const Query = graphql`
  query PublicClubQuery($slug: String!) {
    club(slug: $slug) {
      id
      name
      slug
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
      ...ClubSuspendedStaffAlertFragment
    }
    viewer {
      ...JoinClubFromPageViewerFragment
      ...SupportClubButtonViewerFragment
      ...LockedAccountBannerFragment
    }
  }
`

export default function PublicClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicClubQuery>(
    Query,
    props.query
  )

  const { i18n } = useLingui()

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  const number = abbreviateNumber(queryData?.club?.membersCount ?? 0, 3)

  return (
    <>
      <Head>
        <title>
          {queryData.club.name} on overdoll :: overdoll.com/{queryData.club.slug}
        </title>
      </Head>
      <LockedAccountBanner query={queryData?.viewer} />
      <ClubSuspendedStaffAlert query={queryData?.club} />
      <Stack spacing={8}>
        <Box h={200}>
          <TileOverlay
            backdrop={(
              <ResourceItem
                seed={queryData?.club?.id}
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
          <SupportClubButton clubQuery={queryData?.club} viewerQuery={queryData?.viewer} />
          <ClubExclusivePosts query={queryData?.club} />
        </Stack>
        <ClubTopPosts query={queryData?.club} />
      </Stack>
    </>
  )
}
