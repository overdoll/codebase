import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenShuffleFragment$key } from '@//:artifacts/RouletteScreenShuffleFragment.graphql'
import type { RouletteScreenShuffleViewerFragment$key } from '@//:artifacts/RouletteScreenShuffleViewerFragment.graphql'
import { graphql } from 'react-relay'
import RouletteScreenPost from '../RouletteScreenPost/RouletteScreenPost'
import { Flex } from '@chakra-ui/react'
import RouletteScreenBackground from '../RouletteScreenBackground/RouletteScreenBackground'
import RouletteScreenShuffleOverlay from './RouletteScreenShuffleOverlay/RouletteScreenShuffleOverlay'

interface Props {
  query: RouletteScreenShuffleFragment$key
  viewerQuery: RouletteScreenShuffleViewerFragment$key | null
}

const Fragment = graphql`
  fragment RouletteScreenShuffleFragment on RouletteStatus {
    gameState @required(action: THROW) {
      post {
        ...RouletteScreenPostFragment
        ...RouletteScreenBackgroundFragment
      }
      ...RouletteScreenDiceFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment RouletteScreenShuffleViewerFragment on Account {
    ...RouletteScreenPostViewerFragment
  }
`

export default function RouletteScreenShuffle (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  // TODO post shuffle and animation logic here

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Flex w='100%' h='100%' position='relative'>
      <RouletteScreenBackground query={data.gameState.post} />
      <RouletteScreenPost query={data.gameState.post} viewerQuery={viewerData} />
      <RouletteScreenShuffleOverlay />
    </Flex>
  )
}
