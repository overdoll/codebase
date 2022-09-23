import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { PostsWaterfallQuery } from '@//:artifacts/PostsWaterfallQuery.graphql'
import { Grid, GridItem } from '@chakra-ui/react'
import RawPostContentBanner
  from '@//:modules/content/HookedComponents/Post/fragments/PostContent/RawPostContentBanner/RawPostContentBanner'

const Query = graphql`
  query PostsWaterfallQuery {
    postsFeed (first: 28) {
      edges {
        node {
          id
          content {
            ...RawPostContentBannerFragment
          }
        }
      }
    }
  }
`

export default function PostsWaterfall (): JSX.Element {
  const data = useLazyLoadQuery<PostsWaterfallQuery>(Query, {})

  return (
    <Grid
      gap={0}
      templateColumns={{
        base: 'repeat(3, 1fr)',
        md: 'repeat(5, 1fr)',
        xl: 'repeat(7, 1fr)'
      }}
    >
      {data.postsFeed.edges.map((item) => (
        <GridItem key={item.node.id}>
          <RawPostContentBanner postContentQuery={item.node.content[0]} />
        </GridItem>))}
    </Grid>
  )
}
