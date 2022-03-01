import { PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubPublicPageQuery } from '@//:artifacts/ClubPublicPageQuery.graphql'
import { graphql } from 'react-relay'
import LargeClubHeader from '../../../components/LargeClubHeader/LargeClubHeader'
import { Box, HStack, Stack } from '@chakra-ui/react'
import StatisticNumber from '../../../components/StatisticNumber/StatisticNumber'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { abbreviateNumber } from '@//:modules/support'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import JoinClubButton from '../../../components/JoinClubButton/JoinClubButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { ClubMembers } from '@//:assets/icons/interface'
import RandomIcon from '@//:modules/content/DataDisplay/RandomIcon/RandomIcon'
import PostsHorizontalPreview from './PostsHorizontalPreview/PostsHorizontalPreview'
import type { ClubPublicPageTopPostsFragment$key } from '@//:artifacts/ClubPublicPageTopPostsFragment.graphql'
import type { ClubPublicPageNewPostsFragment$key } from '@//:artifacts/ClubPublicPageNewPostsFragment.graphql'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ClubPublicPageQuery>
}

const Query = graphql`
  query ClubPublicPageQuery($slug: String!) {
    club(slug: $slug) {
      slug
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
      ...ClubPublicPageNewPostsFragment
      ...ClubPublicPageTopPostsFragment
      ...ClubMenuFragment
    }
    viewer {
      ...JoinClubButtonViewerFragment
    }
  }
`

const TopPostsFragment = graphql`
  fragment ClubPublicPageTopPostsFragment on Club {
    topPosts: posts(first: 10, sortBy: TOP) {
      ...PostsHorizontalPreviewFragment
    }
  }
`

const NewPostsFragment = graphql`
  fragment ClubPublicPageNewPostsFragment on Club {
    newPosts: posts(first: 10, sortBy: NEW) {
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubPublicPage (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPublicPageQuery>(
    Query,
    props.query
  )

  const topPostsData = useFragment<ClubPublicPageTopPostsFragment$key>(TopPostsFragment, queryData.club)
  const newPostsData = useFragment<ClubPublicPageNewPostsFragment$key>(NewPostsFragment, queryData.club)

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  const { i18n } = useLingui()

  const number = abbreviateNumber(queryData?.club?.membersCount ?? 0, 3)

  const topPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'TOP'
  })

  const newPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'NEW'
  })

  const AddAvatars = (): JSX.Element => {
    if (queryData?.club?.members.edges == null) return <></>

    const placeholderLength = 10 - queryData?.club?.members.edges.length

    return (
      <HStack spacing={-8}>
        {[...Array(placeholderLength).keys()].map((item, index) =>
          <Box
            key={index}
            borderRadius='25%'
            w={16}
            h={16}
            borderWidth={3}
            borderColor='gray.900'
            bg='gray.700'
          >
            <RandomIcon />
          </Box>)}
        {queryData?.club?.members.edges.map((item, index) =>
          <ResourceIcon key={index} w={16} h={16} query={item.node.account.avatar} />)}
      </HStack>
    )
  }

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <Box h={140}>
          <TileOverlay
            backdrop={<ResourceItem query={queryData?.club?.backgroundPost?.edges[0]?.node?.content[0] ?? null} />}
          >
            <LargeClubHeader query={queryData?.club} />
          </TileOverlay>
        </Box>
        <HStack spacing={3}>
          <JoinClubButton
            w='100%'
            clubQuery={queryData?.club}
            viewerQuery={queryData?.viewer}
          />
          <ClubMenu query={queryData?.club} />
        </HStack>
      </Stack>
      <Stack align='center' spacing={2}>
        <StatisticNumber
          value={number}
          text={i18n._(t`Members`)}
          icon={ClubMembers}
        />
        <AddAvatars />
      </Stack>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            Top posts from this club
          </PageSectionTitle>
        </PageSectionWrap>
        {topPostsData != null &&
          <PostsHorizontalPreview
            to={`/${queryData?.club?.slug}/posts?${stringify(topPostsEncodedQuery)}`}
            query={topPostsData?.topPosts}
          />}
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            New posts from this club
          </PageSectionTitle>
        </PageSectionWrap>
        {newPostsData != null &&
          <PostsHorizontalPreview
            to={`/${queryData?.club?.slug}/posts?${stringify(newPostsEncodedQuery)}`}
            query={newPostsData?.newPosts}
          />}
      </Box>
    </Stack>
  )
}
