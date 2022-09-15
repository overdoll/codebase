import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaRouletteFragment$key } from '@//:artifacts/MetaRouletteFragment.graphql'
import { MetaRouletteViewerFragment$key } from '@//:artifacts/MetaRouletteViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import RouletteRichObject from './RouletteRichObject/RouletteRichObject'
import { SequenceProvider, useSequence, ValueResolver } from '@//:modules/content/HookedComponents/Sequence'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import ContainerRoulette from './ContainerRoulette/ContainerRoulette'

interface Props {
  gameSessionStatusQuery: MetaRouletteFragment$key | null
  viewerQuery: MetaRouletteViewerFragment$key | null
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

const ViewerFragment = graphql`
  fragment MetaRouletteViewerFragment on Account {
    ...ContainerRouletteViewerFragment
  }
`

export default function MetaRoulette (props: Props): JSX.Element {
  const {
    gameSessionStatusQuery,
    viewerQuery
  } = props

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const gameData = useFragment(GameFragment, gameSessionStatusQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <RouletteRichObject />
      <SequenceProvider {...methods}>
        <GlobalVideoManagerProvider>
          <ContainerRoulette gameSessionStatusQuery={gameData} viewerQuery={viewerData} />
        </GlobalVideoManagerProvider>
      </SequenceProvider>
    </>
  )
}
