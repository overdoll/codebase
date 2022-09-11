import { Flex } from '@chakra-ui/react'

interface Props {
  player: any
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player
  } = props

  return (
    <Flex w='100%' h='100%' p={2}>
      <></>
    </Flex>
  )
}
