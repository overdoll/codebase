import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { RecommendedPostsGridFragment$key } from '@//:artifacts/RecommendedPostsGridFragment.graphql'
import { Box, Grid, Stack } from '@chakra-ui/react'
import MemoKey from '@//:modules/content/HookedComponents/Post/components/PaginationScroller/MemoKey/MemoKey'
import GridPaginationPost
  from '@//:modules/content/HookedComponents/Post/components/PaginationScroller/GridPaginationScroller/GridPaginationPost/GridPaginationPost'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { HeartFull } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  rootQuery: RecommendedPostsGridFragment$key
}

const Fragment = graphql`
  fragment RecommendedPostsGridFragment on Query {
    postsRecommendations(first: 30) {
      edges {
        node {
          id
          ...GridPaginationPostFragment
        }
      }
    }
  }
`

export default function RecommendedPostsGrid (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <Stack spacing={2}>
      <PageHeader icon={HeartFull} title={<Trans>Suggested posts</Trans>} />
      <Grid
        overflow='visible'
        rowGap={3}
        columnGap={3}
        templateColumns='repeat(auto-fill, minmax(160px, 1fr))'
      >
        {data.postsRecommendations.edges.map((item) => (
          <Box
            key={item.node.id}
            position='relative'
          >
            <Box pt='100%' />
            <Box top={0} w='100%' h='100%' position='absolute'>
              <MemoKey memoKey={item.node.id}>
                <GridPaginationPost query={item.node} />
              </MemoKey>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  )
}
