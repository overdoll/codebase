import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import type { CreateRouletteSessionMutation } from '@//:artifacts/CreateRouletteSessionMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import RouletteScreenBackground from '../RouletteScreenBackground/RouletteScreenBackground'

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
  const [, setGameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

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
    onCreateGame()
  }, [])

  if (isCreatingGame) {
    return (
      <RouletteScreenBackground>
        creating game session
      </RouletteScreenBackground>
    )
  }

  if (hasError) {
    return (
      <Button onClick={onCreateGame}>
        <Trans>
          Error. Retry Game Creation
        </Trans>
      </Button>
    )
  }

  return (
    <RouletteScreenBackground>
      creating game session
    </RouletteScreenBackground>
  )
}
