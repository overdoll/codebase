import { useFragment, useMutation } from 'react-relay/hooks'
import type { SpinRouletteFragment$key } from '@//:artifacts/SpinRouletteFragment.graphql'
import { graphql } from 'react-relay'
import { t } from '@lingui/macro'
import { SpinRouletteMutation } from '@//:artifacts/SpinRouletteMutation.graphql'
import { SpinRouletteCreateGameMutation } from '@//:artifacts/SpinRouletteCreateGameMutation.graphql'
import { useQueryParam } from 'use-query-params'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SpinRouletteButton from './SpinRouletteButton/SpinRouletteButton'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUpdateEffect } from 'usehooks-ts'
import React, { Suspense, useEffect } from 'react'
import SpinRouletteUpdate from './SpinRouletteButton/SpinRouletteUpdate/SpinRouletteUpdate'

interface Props {
  query: SpinRouletteFragment$key
}

interface SearchProps {
  reference: string
}

const Fragment = graphql`
  fragment SpinRouletteFragment on RouletteStatus {
    gameSession {
      id
      reference
      isClosed
    }
    gameState {
      __typename
      diceOne
      diceTwo
      diceThree
    }
    ...SpinRouletteButtonFragment
  }
`

const SpinMutation = graphql`
  mutation SpinRouletteMutation($input: SpinRouletteInput!) {
    spinRoulette(input: $input) {
      rouletteGameState {
        id
        diceOne
        diceTwo
        diceThree
        post {
          ...RouletteScreenPostFragment
        }
      }
    }
  }
`

const RestartMutation = graphql`
  mutation SpinRouletteCreateGameMutation($input: CreateGameSessionInput!) {
    createGameSession(input: $input) {
      gameSession {
        id
        reference
      }
    }
  }
`

export default function SpinRoulette (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    searchArguments,
    setArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      reference: data.gameSession.reference
    }
  })

  const [spinRoulette, isSpinningRoulette] = useMutation<SpinRouletteMutation>(SpinMutation)
  const [createGame, isCreatingGame] = useMutation<SpinRouletteCreateGameMutation>(RestartMutation)

  const [, setGameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const notify = useToast()

  const onSpin = (): void => {
    spinRoulette({
      variables: {
        input: {
          gameSessionId: data.gameSession.id
        }
      },
      onCompleted (rouletteData) {

      },
      updater: (store, payload) => {
        if (data.gameState == null) {
          const payload = store.getRootField('spinRoulette').getLinkedRecord('rouletteGameState')
          store.getRoot().getLinkedRecord('gameSessionStatus', { reference: data.gameSession.reference })?.setLinkedRecord(payload, 'gameState')
          dispatch({
            type: 'tutorialCompleted',
            value: true,
            transform: 'SET'
          })
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error spinning. Please try again.`
        })
      }
    })
  }

  const onCreateGame = (): void => {
    createGame({
      variables: {
        input: {
          gameType: 'ROULETTE'
        }
      },
      onCompleted (storeData) {
        if (storeData.createGameSession?.gameSession?.reference != null) {
          setGameSessionId(storeData.createGameSession.gameSession.reference)
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error restarting game. Please try again.`
        })
      }
    })
  }

  const onClick = (): void => {
    if (data.gameSession.isClosed) {
      onCreateGame()
      return
    }
    onSpin()
  }

  // If user completed tutorial, we want to spin right away instead of showing them the screen again
  useUpdateEffect(() => {
    if (data.gameState == null && state.tutorialCompleted === true) {
      onSpin()
    }
  }, [state.tutorialCompleted, data.gameState])

  // If user gets a triple, we load a query to see the results
  useEffect(() => {
    if (data.gameState == null || data.gameSession.isClosed) return
    const diceRolls = [data.gameState.diceOne, data.gameState.diceThree, data.gameState.diceTwo]

    if (diceRolls.every(val => val === diceRolls[0])) {
      setArguments({
        reference: data.gameSession.reference
      })
      loadQuery()
    }
  }, [data.gameState, data.gameSession])

  return (
    <>
      <Suspense fallback={<></>}>
        <SpinRouletteUpdate searchArguments={searchArguments} />
      </Suspense>
      <SpinRouletteButton isDisabled={isCreatingGame || isSpinningRoulette} onClick={onClick} query={data} />
    </>
  )
}
