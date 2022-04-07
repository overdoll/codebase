import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'
import { graphql } from 'react-relay'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'
import { GlobalVideoManagerProvider, PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/support/ObserverManager/ObserverManager'
import { NotFoundPublicPost } from '@//:modules/content/Placeholder'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Box, Flex, HStack, Stack, useUpdateEffect } from '@chakra-ui/react'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFloatingFooter } from '@//:modules/content/PageLayout'
import { ClubPeopleGroup } from '@//:assets/icons'
import SuggestedPosts from './SuggestedPosts/SuggestedPosts'
import PageFilledWrapper from '@//:modules/content/PageLayout/Wrappers/PageFilledWrapper/PageFilledWrapper'
import PostSearchButton from '../../../components/PostsSearch/components/PostSearchButton/PostSearchButton'
import FixedHeaderWrapper from '../../../components/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import PageFixedHeader from '../../../components/PageFixedHeader/PageFixedHeader'
import { useQueryParam } from 'use-query-params'
import ClubSuspendedStaffAlert
  from '../../ClubPublicPage/ClubPublicPage/ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
import LockedAccountTrigger from '../../../components/LockedAccount/LockedAccountTrigger/LockedAccountTrigger'
import { Helmet } from 'react-helmet-async'
import { useHistory, useParams } from '@//:modules/routing'
import { useEffect } from 'react'

interface Props {
  query: PreloadedQuery<PublicPostQuery>
}

const Query = graphql`
  query PublicPostQuery($reference: String!) {
    post(reference: $reference) {
      reference
      ...FullDetailedPostFragment
      ...SuggestedPostsFragment
      club {
        ...ClubSuspendedStaffAlertFragment
        name
        slug
      }
      characters {
        name
      }
    }
    viewer {
      ...FullDetailedPostViewerFragment
      ...SuggestedPostsViewerFragment
    }
  }
`

export default function PublicPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicPostQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  const match = useParams()

  if (queryData?.post == null) {
    return (
      <NotFoundPublicPost />
    )
  }

  const [, setParamStep] = useQueryParam<string | null | undefined>('step')

  const steps = ['post', 'recommended']

  const PostComponent = (
    <PageFilledWrapper>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <HStack spacing={2} justify='flex-end'>
            <LockedAccountTrigger />
            <PostSearchButton routeTo='/search' />
          </HStack>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <ClubSuspendedStaffAlert query={queryData.post.club} />
      <Stack spacing={4}>
        <ObserverManagerProvider>
          <PostVideoManagerProvider>
            <FullDetailedPost query={queryData?.post} viewerQuery={queryData?.viewer} />
          </PostVideoManagerProvider>
        </ObserverManagerProvider>
        <FlowBuilderFloatingFooter />
      </Stack>
    </PageFilledWrapper>
  )

  const RecommendedComponent = (
    <PageInfiniteScrollWrapper>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <Flex justify='flex-end'>
            <PostSearchButton routeTo='/search' />
          </Flex>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <Box w='100%' h='100%' position='relative'>
        <SuggestedPosts query={queryData.post} viewerQuery={queryData.viewer} />
        <Box pb={1} zIndex='docked' bottom={0} w='100%' position='absolute'>
          <FlowBuilderFloatingFooter />
        </Box>
      </Box>
    </PageInfiniteScrollWrapper>
  )

  const components = {
    post: PostComponent,
    recommended: RecommendedComponent
  }

  const headers = {
    post: {
      title: 'View Post',
      icon: ClubPeopleGroup
    },
    recommended: {
      title: 'Recommended Posts',
      icon: ClubPeopleGroup
    }
  }

  const getCharacterNames = (): string => {
    if (queryData?.post?.characters.length === 1) {
      return queryData?.post?.characters[0].name
    }
    return ((queryData?.post?.characters as Array<{ name: string }>).map((item) => item.name)).join(', ')
  }

  useUpdateEffect(() => {
    setParamStep(undefined)
  }, [queryData.post.reference])

  useEffect(() => {
    if (match.slug != null && match.slug !== queryData?.post?.club.slug) {
      history.replace(`/${queryData?.post?.club.slug as string}/p/${queryData?.post?.reference as string}`)
    }
  }, [match.slug])

  return (
    <>
      <Helmet>
        <title>
          {getCharacterNames()} by {queryData.post.club.name} :: overdoll.com/{queryData.post.club.slug}
        </title>
      </Helmet>
      <FlowBuilder
        stepsArray={steps}
        stepsComponents={components}
        stepsHeaders={headers}
        useParams
      >
        <GlobalVideoManagerProvider>
          <FlowBuilderBody />
        </GlobalVideoManagerProvider>
      </FlowBuilder>
    </>
  )
}
