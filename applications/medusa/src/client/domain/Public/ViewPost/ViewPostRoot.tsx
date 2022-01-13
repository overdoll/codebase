import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import ViewPost from './ViewPost/ViewPost'
import type { ViewPostQuery as ViewPostQueryType } from '@//:artifacts/ViewPostQuery.graphql'
import ViewPostQuery from '@//:artifacts/ViewPostQuery.graphql'
import { Center, Flex, Skeleton, Stack } from '@chakra-ui/react'
import { useParams } from '@//:modules/routing/useParams'

interface Props {
  prepared: {
    query: PreloadedQuery<ViewPostQueryType>
  }
}

export default function ViewPostRoot (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ViewPostQuery,
    props.prepared.query
  )

  const params = useParams()

  const LoadingPlaceholder = (): JSX.Element => {
    return (
      <Stack spacing={1}>
        <PostPlaceholder p={0}>
          <Skeleton />
        </PostPlaceholder>
      </Stack>
    )
  }

  return (
    <>
      <Helmet title='view post' />
      <Center h='100%'>
        <Flex
          w='100%'
          h='100%'
          direction={{
            base: 'column',
            md: 'row'
          }}
          justify='space-between'
          pl={[1, 0]}
          pr={[1, 0]}
        >
          <QueryErrorBoundary loadQuery={() => loadQuery({ reference: params?.reference ?? '' })}>
            <Suspense fallback={<LoadingPlaceholder />}>
              <ViewPost query={queryRef as PreloadedQuery<ViewPostQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}
