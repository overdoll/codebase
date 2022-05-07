import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { SearchQuery as SearchQueryType } from '@//:artifacts/SearchQuery.graphql'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import Search from './Search/Search'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import useGeneralSearchArguments
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/support/useGeneralSearchArguments'
import { PostOrderButton, PostSearchButton } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  queryRefs: {
    searchQuery: PreloadedQuery<SearchQueryType>
  }
}

const RootSearch: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    SearchQuery,
    props.queryRefs.searchQuery
  )

  useGeneralSearchArguments((params) => loadQuery(params))

  return (
    <>
      <Head>
        <title>
          Search :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Stack spacing={2}>
            <HStack spacing={2} justify='space-between'>
              <Heading color='gray.00' fontSize='2xl'>
                <Trans>
                  Search
                </Trans>
              </Heading>
              <PostSearchButton routeTo='/search' />
            </HStack>
            <PostOrderButton />
          </Stack>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            sortBy: 'TOP'
          })}
          >
            <Suspense fallback={<SkeletonPost />}>
              <Search query={queryRef as PreloadedQuery<SearchQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootSearch
