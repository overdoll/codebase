import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'
import { graphql } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { NotFoundPublicPost } from '@//:modules/content/Placeholder'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Box, Flex, useUpdateEffect } from '@chakra-ui/react'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFloatingFooter } from '@//:modules/content/PageLayout'
import { ClubPeopleGroup } from '@//:assets/icons'
import SuggestedPosts from './SuggestedPosts/SuggestedPosts'
import PostSearchButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import FixedHeaderWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import { useQueryParam } from 'use-query-params'
import { useEffect } from 'react'
import PublicPostPage from './PublicPostPage/PublicPostPage'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  query: PreloadedQuery<PublicPostQuery>
}

const Query = graphql`
  query PublicPostQuery($reference: String!) {
    post(reference: $reference) {
      reference
      ...SuggestedPostsFragment
      club {
        name
        slug
      }
      characters {
        name
      }
      ...PublicPostPageFragment

    }
    viewer {
      ...SuggestedPostsViewerFragment
      ...PublicPostPageViewerFragment
    }
  }
`

export default function PublicPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicPostQuery>(
    Query,
    props.query
  )

  const router = useRouter()

  const { query: { slug } } = router

  if (queryData?.post == null) {
    return (
      <NotFoundPublicPost />
    )
  }

  const [, setParamStep] = useQueryParam<string | null | undefined>('step')

  const steps = ['post', 'recommended']

  const PostComponent = <PublicPostPage query={queryData.post} viewerQuery={queryData.viewer} />

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
    if (slug != null && slug !== queryData?.post?.club.slug) {
      void router.replace({
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: queryData?.post?.club.slug as string,
          reference: queryData?.post?.reference
        }
      })
    }
  }, [slug])

  return (
    <>
      <Head>
        <title>
          {getCharacterNames()} by {queryData.post.club.name} :: overdoll.com/{queryData.post.club.slug}
        </title>
      </Head>
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
