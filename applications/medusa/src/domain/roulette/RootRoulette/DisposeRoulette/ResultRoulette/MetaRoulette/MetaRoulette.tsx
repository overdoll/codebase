import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaRouletteFragment$key } from '@//:artifacts/MetaRouletteFragment.graphql'
import RouletteRichObject from './RouletteRichObject/RouletteRichObject'
import { SequenceProvider, useSequence, ValueResolver } from '@//:modules/content/HookedComponents/Sequence'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import ContainerRoulette from './ContainerRoulette/ContainerRoulette'

interface Props {
  gameSessionStatusQuery: MetaRouletteFragment$key | null
}

interface SequenceProps {
  tutorialCompleted: boolean
  isSpinning: boolean
  isPending: boolean
}

const defaultValue: SequenceProps = {
  tutorialCompleted: false,
  isSpinning: false,
  isPending: false
}

const resolver: SequenceResolver<SequenceProps> = {
  tutorialCompleted: ValueResolver(),
  isSpinning: ValueResolver(),
  isPending: ValueResolver()
}

const GameFragment = graphql`
  fragment MetaRouletteFragment on GameSessionStatus {
    ...ContainerRouletteFragment
  }
`

export default function MetaRoulette (props: Props): JSX.Element {
  const {
    gameSessionStatusQuery
  } = props

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const gameData = useFragment(GameFragment, gameSessionStatusQuery)

  return (
    <>
      <RouletteRichObject />
      <SequenceProvider {...methods}>
        <ContainerRoulette gameSessionStatusQuery={gameData} />
      </SequenceProvider>
    </>
  )
}
