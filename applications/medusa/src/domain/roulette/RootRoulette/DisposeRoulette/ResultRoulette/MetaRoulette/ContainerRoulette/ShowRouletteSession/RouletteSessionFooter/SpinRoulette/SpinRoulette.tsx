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
import React, { Suspense, useEffect, useState } from 'react'
import SpinRouletteUpdate from './SpinRouletteButton/SpinRouletteUpdate/SpinRouletteUpdate'
import { useUpdateEffect } from 'usehooks-ts'
import { useKeyPress } from '@//:modules/support/useKeyPress'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  query: SpinRouletteFragment$key | null
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
      viewerIsPlayer
    }
    gameState {
      __typename
      diceOne
      diceTwo
      diceThree
    }
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
          ...RouletteScreenPostDataFragment
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
      reference: data?.gameSession?.reference ?? ''
    }
  })

  const [spinRoulette, isSpinningRoulette] = useMutation<SpinRouletteMutation>(SpinMutation)
  const [createGame, isCreatingGame] = useMutation<SpinRouletteCreateGameMutation>(RestartMutation)

  const [, setGameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const isKeyPressed = useKeyPress(' ')

  const disableSpin = state.isPending === true || isCreatingGame

  const spinTwice = data?.gameSession?.isClosed === true && data?.gameSession?.viewerIsPlayer
  const [confirmSpin, setConfirmSpin] = useState(true)

  const notify = useToast()

  const onSpin = (skipTracking?: boolean, spunWithShortcut?: boolean): void => {
    if (data == null) return

    spinRoulette({
      variables: {
        input: {
          gameSessionId: data.gameSession.id
        }
      },
      onCompleted () {
        dispatch({
          type: 'isSpinning',
          value: true,
          transform: 'SET'
        })
        if (skipTracking !== true) {
          if (spunWithShortcut === true) {
            // track new spin using keyboard shortcut
            trackFathomEvent('KXKTPYXO', 1)
            return
          }
          // track new spin using regular button click
          trackFathomEvent('WMPMZGXS', 1)
        }
      },
      updater: (store) => {
        if (data.gameState == null) {
          const payload = store.getRootField('spinRoulette').getLinkedRecord('rouletteGameState')
          store.getRoot().getLinkedRecord('gameSessionStatus', { reference: data.gameSession.reference })?.setLinkedRecord(payload, 'gameState')
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

  const onCreateGame = (completeTutorial: boolean): void => {
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
        if (completeTutorial) {
          dispatch({
            type: 'tutorialCompleted',
            value: true,
            transform: 'SET'
          })
        }
        setConfirmSpin(true)
        // track new game creation
        trackFathomEvent('ACHBYYQY', 1)
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error restarting game. Please try again.`
        })
      }
    })
  }

  const onClick = (skipTracking?: boolean, spunWithShortcut?: boolean): void => {
    if (spinTwice && confirmSpin && state.isSpinning === false) {
      setConfirmSpin(false)
      return
    }
    if (data == null) {
      onCreateGame(true)
      return
    }
    if (!data.gameSession.viewerIsPlayer) {
      onCreateGame(false)
      return
    }
    // if spinning, you can skip it with the first button click
    if (state.isSpinning === true) {
      dispatch({
        type: 'isSpinning',
        value: false,
        transform: 'SET'
      })
      // track spin skipping
      trackFathomEvent('HRIMDERJ', 1)
      return
    }
    if (data.gameSession.isClosed) {
      if (state.tutorialCompleted === false) {
        setGameSessionId(undefined)
        return
      }
      onCreateGame(false)
      return
    }
    onSpin(skipTracking, spunWithShortcut)
  }

  const diceRolls = data?.gameState != null ? [data.gameState.diceOne, data.gameState.diceThree, data.gameState.diceTwo] : [1, 2, 3]

  const isReSpin = !(new Set(diceRolls).size === diceRolls.length) && !(diceRolls.every(val => val === diceRolls[0]))

  // If user completed tutorial, we want to spin right away instead of showing them the screen again
  useEffect(() => {
    if (data == null) return
    if (data?.gameState == null && state.tutorialCompleted === true) {
      onSpin(true)
    }
  }, [state.tutorialCompleted, data?.gameState])

  // If user gets a triple, we load a query to see the results
  useEffect(() => {
    if (data == null) return
    if (data?.gameState == null || data.gameSession.isClosed) return
    if (diceRolls.every(val => val === diceRolls[0])) {
      setArguments({
        reference: data.gameSession.reference
      })
      loadQuery()
      // track game loss
      trackFathomEvent('TSKUTJW8', 1)
    }
  }, [data?.gameState, data?.gameSession])

  useUpdateEffect(() => {
    dispatch({
      type: 'isPending',
      value: isSpinningRoulette,
      transform: 'SET'
    })
  }, [isSpinningRoulette])

  useEffect(() => {
    if (isKeyPressed && !disableSpin) {
      onClick(false, true)
    }
  }, [isKeyPressed])

  return (
    <>
      {(data?.gameState != null && diceRolls.every(val => val === diceRolls[0])) && (
        <Suspense fallback={<></>}>
          <SpinRouletteUpdate searchArguments={searchArguments} />
        </Suspense>
      )}
      <SpinRouletteButton
        isReSpin={isReSpin}
        showSpinConfirm={spinTwice && !confirmSpin}
        canFastForward={state.isSpinning === true && state.isPending === false}
        isDisabled={disableSpin}
        onClick={() => onClick(false, false)}
      />
    </>
  )
}
