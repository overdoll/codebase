import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import type { CreateRouletteSessionMutation } from '@//:artifacts/CreateRouletteSessionMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { GridItem } from '@chakra-ui/react'
import RouletteScreenLoading from '../RouletteScreenLoading/RouletteScreenLoading'

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

  if (isCreatingGame) {
    return (
      <RouletteScreenLoading />
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
    <RouletteScreenLoading />
  )
}
