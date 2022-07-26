import { Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { TopicTileOverlayFragment$key } from '@//:artifacts/TopicTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'

interface Props {
  query: TopicTileOverlayFragment$key
}

const Fragment = graphql`
  fragment TopicTileOverlayFragment on Topic {
    id
    title
    banner {
      ...ResourceItemFragment
    }
  }
`

export default function TopicTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={
      <ResourceItem
        showBorder
        seed={data.id}
        query={data.banner}
      />
    }
    >
      <Stack whiteSpace='pre' p={2} w='100%' h='100%' align='center' justify='center' spacing={0}>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          color='gray.00'
          textAlign='center'
          whiteSpace='normal'
          wordBreak='break-word'
          noOfLines={4}
        >
          {data.title}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
