import { Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { TopicTileOverlayFragment$key } from '@//:artifacts/TopicTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import TopicBanner from '../../../PageLayout/Display/fragments/Banner/TopicBanner/TopicBanner'

interface Props {
  query: TopicTileOverlayFragment$key
}

const Fragment = graphql`
  fragment TopicTileOverlayFragment on Topic {
    title
    ...TopicBannerFragment
  }
`

export default function TopicTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={<TopicBanner topicQuery={data} />}>
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
