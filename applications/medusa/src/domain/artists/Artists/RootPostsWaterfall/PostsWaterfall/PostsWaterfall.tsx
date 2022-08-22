import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { PostsWaterfallQuery } from '@//:artifacts/PostsWaterfallQuery.graphql'
import { Grid, GridItem } from '@chakra-ui/react'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'

const Query = graphql`
  query PostsWaterfallQuery {
    postsFeed (first: 28) {
      edges {
        node {
          id
          content {
            resource {
              preview
            }
            ...ResourceInfoFragment
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
      {data.postsFeed.edges.map((item, index) => {
        return (
          <GridItem bg={item.node.content[0].resource.preview} key={index}>
            <ResourceInfo cover containCover query={item.node.content[0]} />
          </GridItem>
        )
      })}
    </Grid>
  )
}
