import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'
import { graphql } from 'react-relay'
import { NotFoundPublicPost } from '@//:modules/content/Placeholder'
import { Heading, HStack, Stack, useUpdateEffect } from '@chakra-ui/react'
import SuggestedPosts from './SuggestedPosts/SuggestedPosts'
import { useQueryParam } from 'use-query-params'
import { useEffect } from 'react'
import PublicPostPage from './PublicPostPage/PublicPostPage'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PostSearchButton
  from '../../../../../modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import { Trans } from '@lingui/macro'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'

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
      <Stack spacing={4}>
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>
              View Post
            </Trans>
          </Heading>
          <PostSearchButton routeTo='/search' />
        </HStack>
        <Stack spacing={24}>
          <GlobalVideoManagerProvider>
            <PublicPostPage query={queryData.post} viewerQuery={queryData.viewer} />
            <Stack spacing={4}>
              <HStack spacing={2} justify='space-between'>
                <Heading color='gray.00' fontSize='2xl'>
                  <Trans>
                    Suggested Posts
                  </Trans>
                </Heading>
              </HStack>
              <SuggestedPosts query={queryData.post} viewerQuery={queryData.viewer} />
            </Stack>
          </GlobalVideoManagerProvider>
        </Stack>
      </Stack>
    </>
  )
}
