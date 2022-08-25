import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import type { CreateRouletteSessionMutation } from '@//:artifacts/CreateRouletteSessionMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { Grid, GridItem } from '@chakra-ui/react'

const Mutation = graphql`
  mutation CreateRouletteSessionMutation($input: CreateGameSessionInput!) {
    createGameSession(input: $input) {
      gameSession {
        reference
      }
    }
  }
`

export default function CreateRouletteSession (): JSX.Element {
  const [gameSessionId, setGameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const [createGame, isCreatingGame] = useMutation<CreateRouletteSessionMutation>(Mutation)

  const [hasError, setHasError] = useState(false)

  const onCreateGame = (): void => {
    createGame({
      variables: {
        input: {
          gameType: 'ROULETTE'
        }
      },
      onCompleted (data) {
        if (data.createGameSession?.gameSession?.reference != null) {
          setGameSessionId(data.createGameSession.gameSession.reference)
        }
      },
      onError () {
        setHasError(true)
      }
    })
  }

  useEffect(() => {
    if (gameSessionId == null) {
      onCreateGame()
    }
  }, [gameSessionId])

  const ShowCreateSession = (): JSX.Element => {
    if (isCreatingGame) {
      return (
        <GridItem bg='green.400'>creating game session</GridItem>
      )
    }

    if (hasError) {
      return (
        <GridItem bg='orange.400'>
          <Button onClick={onCreateGame}>
            <Trans>
              Error. Retry Game Creation
            </Trans>
          </Button>
        </GridItem>
      )
    }

    return (
      <GridItem bg='purple.400'>creating game session</GridItem>
    )
  }

  return (
    <Grid overflow='hidden' templateRows='1fr' templateColumns='100%' h='92vh' w='100%'>
      <ShowCreateSession />
    </Grid>
  )
}
