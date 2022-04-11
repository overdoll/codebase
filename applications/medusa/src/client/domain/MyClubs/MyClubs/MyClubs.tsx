import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { graphql } from 'react-relay'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import SearchSuggestedClubs from './SearchSuggestedClubs/SearchSuggestedClubs'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFloatingFooter, PageWrapper } from '@//:modules/content/PageLayout'
import { ClubPeopleGroup } from '@//:assets/icons'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Box, HStack, Stack } from '@chakra-ui/react'
import FixedHeaderWrapper
  from '../../../../modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import LockedAccountTrigger from '../../Home/LockedAccount/LockedAccountTrigger/LockedAccountTrigger'
import PostSearchButton
  from '../../../../modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '../../../../modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'

interface Props {
  query: PreloadedQuery<MyClubsQuery>
}

const Query = graphql`
  query MyClubsQuery {
    viewer {
      ...ClubPostsFeedFragment
      ...ClubPostsFeedViewerFragment
      clubMembershipsCount
    }
  }
`

export default function MyClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyClubsQuery>(
    Query,
    props.query
  )

  if (queryData.viewer == null || queryData?.viewer?.clubMembershipsCount < 1) {
    return (
      <PageWrapper>
        <SearchSuggestedClubs />
      </PageWrapper>
    )
  }

  const PostsFeed = (
    <PageInfiniteScrollWrapper>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <HStack spacing={2} justify='flex-end'>
            <LockedAccountTrigger />
            <PostSearchButton routeTo='/search' />
          </HStack>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <Box w='100%' h='100%' position='relative'>
        <ClubPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
        <Box pb={1} zIndex='docked' bottom={0} w='100%' position='absolute'>
          <FlowBuilderFloatingFooter />
        </Box>
      </Box>
    </PageInfiniteScrollWrapper>
  )

  const SuggestedClubs = (
    <PageWrapper>
      <Stack spacing={4}>
        <FlowBuilderFloatingFooter />
        <SearchSuggestedClubs />
      </Stack>
    </PageWrapper>
  )

  const steps = ['posts', 'clubs']

  const components = {
    posts: PostsFeed,
    clubs: SuggestedClubs
  }

  const headers = {
    posts: {
      title: 'My Club Feed',
      icon: ClubPeopleGroup
    },
    clubs: {
      title: 'See Popular Clubs',
      icon: ClubPeopleGroup
    }
  }

  return (
    <FlowBuilder
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
      useParams
    >
      <FlowBuilderBody />
    </FlowBuilder>
  )
}
