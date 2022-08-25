import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenDiceFragment$key } from '@//:artifacts/RouletteScreenDiceFragment.graphql'
import { graphql } from 'react-relay'
import { Heading, HStack } from '@chakra-ui/react'

interface Props {
  query: RouletteScreenDiceFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenDiceFragment on RouletteGameState {
    diceOne
    diceTwo
    diceThree
  }
`

export default function RouletteScreenDice (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  // TODO create dice logic here?

  return (
    <HStack justify='center'>
      <Heading color='blackAlpha.700'>
        {data.diceOne}
      </Heading>
      <Heading color='blackAlpha.700'>
        {data.diceTwo}
      </Heading>
      <Heading color='blackAlpha.700'>
        {data.diceThree}
      </Heading>
    </HStack>
  )
}
