import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerRouletteFragment$key } from '@//:artifacts/ContainerRouletteFragment.graphql'
import ShowRouletteSession from './ShowRouletteSession/ShowRouletteSession'
import { Grid } from '@chakra-ui/react'

interface Props {
  gameSessionStatusQuery: ContainerRouletteFragment$key | null
}

const GameFragment = graphql`
  fragment ContainerRouletteFragment on GameSessionStatus {
    ...ShowRouletteSessionFragment
  }
`

export default function ContainerRoulette (props: Props): JSX.Element {
  const {
    gameSessionStatusQuery
  } = props

  const gameData = useFragment(GameFragment, gameSessionStatusQuery)

  return (
    <Grid
      templateRows={{
        base: '1fr 24px 96px',
        md: '1fr 24px 144px'
      }}
      gap={1}
      templateColumns='100%'
      h='100%'
      w='100%'
    >
      <ShowRouletteSession query={gameData} />
    </Grid>
  )
}
