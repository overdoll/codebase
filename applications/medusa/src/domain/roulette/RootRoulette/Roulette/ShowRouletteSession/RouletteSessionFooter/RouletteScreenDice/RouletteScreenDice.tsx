import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenDiceFragment$key } from '@//:artifacts/RouletteScreenDiceFragment.graphql'
import { graphql } from 'react-relay'
import { HStack } from '@chakra-ui/react'
import { useAnimationControls } from 'framer-motion'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useEffect, useState } from 'react'
import ControlledRouletteDice from './ControlledRouletteDice/ControlledRouletteDice'
import { randomFunction } from '../../../../support'

interface Props {
  query: RouletteScreenDiceFragment$key | null
}

type DurationTypes = 'veryslow' | 'mediumslow' | 'slow' | 'moderate' | 'fast'

const Fragment = graphql`
  fragment RouletteScreenDiceFragment on RouletteGameState {
    diceOne
    diceTwo
    diceThree
  }
`

const DURATION_TYPES = [
  ['slow', 'slow', 'fast'],
  ['slow', 'fast', 'mediumslow'],
  ['fast', 'slow', 'slow'],
  ['fast', 'fast', 'slow'],
  ['fast', 'fast', 'mediumslow'],
  ['fast', 'moderate', 'moderate'],
  ['moderate', 'fast', 'fast']
]

const generateDurationFromType = (type: DurationTypes): number => {
  const ranges = {
    veryslow: [4.2, 4.7],
    mediumslow: [2.3, 2.9],
    slow: [1.5, 1.9],
    moderate: [0.9, 1.3],
    fast: [0.55, 0.7]
  }

  return randomFunction(ranges[type][0], ranges[type][1])
}

const generateFullDiceDuration = (): number[] => {
  const numberOfDurationTypes = DURATION_TYPES.length
  const randomDurationType = Math.floor(Math.random() * ((numberOfDurationTypes - 1) + 1))
  return DURATION_TYPES[randomDurationType].map((item: DurationTypes) => generateDurationFromType(item))
}

export default function RouletteScreenDice (props: Props): JSX.Element {
  const {
    query
  } = props

  const {
    state,
    dispatch
  } = useSequenceContext()

  const data = useFragment(Fragment, query)

  const diceOneControls = useAnimationControls()
  const diceTwoControls = useAnimationControls()
  const diceThreeControls = useAnimationControls()
  const [diceOneSpinning, setDiceOneSpinning] = useState(false)
  const [diceTwoSpinning, setDiceTwoSpinning] = useState(false)
  const [diceThreeSpinning, setDiceThreeSpinning] = useState(false)
  const [diceDuration, setDiceDuration] = useState(generateFullDiceDuration())

  const showDiceOneGlow = !diceOneSpinning && ((!diceTwoSpinning && data?.diceOne === data?.diceTwo) || (!diceThreeSpinning && data?.diceOne === data?.diceThree))
  const showDiceTwoGlow = !diceTwoSpinning && ((!diceOneSpinning && data?.diceOne === data?.diceTwo) || (!diceThreeSpinning && data?.diceTwo === data?.diceThree))
  const showDiceThreeGlow = !diceThreeSpinning && ((!diceTwoSpinning && data?.diceThree === data?.diceTwo) || (!diceOneSpinning && data?.diceOne === data?.diceThree))

  const shakeTransition = {
    ease: [0, 0.71, 0.2, 1.01],
    times: [0, 0.1, 0.9, 1],
    x: {
      duration: 0.2,
      repeat: Infinity
    },
    y: {
      duration: 0.3,
      repeat: Infinity
    }
  }

  const diceVariants = {
    spinDice: {
      scale: [null, 1.55],
      x: [null, -5, 2.5, 0, 2.5, 0, -5, 0],
      y: [null, -2.5, 5, 0, -2.5, 0, 2.5, 0]
    },
    spinDiceTwo: {
      scale: [null, 1.55],
      x: [null, -7, 2.5, 0, 5.5, 0, -7, 0],
      y: [null, -2.5, 7, 0, -5.5, 0, 2.5, 0]
    },
    spinDiceThree: {
      scale: [null, 1.25, 1.55],
      x: [null, -7, 5.5, 0, 10.5, 0, -10, 0],
      y: [null, -11.5, 10, 0, -7.5, 0, 2.5, 0]
    }
  }

  const spinFirstDice = (): void => {
    const transition = {
      scale: {
        duration: diceDuration[0],
        onComplete: () => {
          spinSecondDice()
        },
        delay: 0.5
      },
      ...shakeTransition
    }

    void diceOneControls.start('spinDice', transition)
  }

  const spinSecondDice = (): void => {
    const transition = {
      scale: {
        duration: diceDuration[1],
        onComplete: () => {
          spinThirdDice()
        }
      },
      ...shakeTransition
    }

    setDiceOneSpinning(false)
    void diceOneControls.start('exit')
    void diceTwoControls.start('spinDiceTwo', transition)
  }

  const spinThirdDice = (): void => {
    if (data == null) return

    const thirdDiceDuration = ((data?.diceOne === data?.diceTwo) && data?.diceOne != null)
      ? generateDurationFromType('veryslow')
      : (((data?.diceOne === data?.diceThree || data?.diceTwo === data?.diceThree) && data?.diceThree != null)
          ? generateDurationFromType('mediumslow')
          : diceDuration[2])
    const transition = {
      scale: {
        duration: thirdDiceDuration,
        onComplete: () => {
          completeSpinning()
        }
      },
      ...shakeTransition
    }
    setDiceTwoSpinning(false)
    void diceTwoControls.start('exit')
    void diceThreeControls.start('spinDiceThree', transition)
  }

  const setDiceSpinning = (): void => {
    setDiceOneSpinning(true)
    setDiceTwoSpinning(true)
    setDiceThreeSpinning(true)
  }

  const startDiceAnimation = (): void => {
    setDiceSpinning()
    spinFirstDice()
  }

  const completeSpinning = (): void => {
    setDiceThreeSpinning(false)
    void diceThreeControls.start('exit')
    dispatch({
      type: 'isSpinning',
      value: false,
      transform: 'SET'
    })
  }

  const resetDiceAnimation = (): void => {
    setDiceOneSpinning(false)
    setDiceTwoSpinning(false)
    setDiceThreeSpinning(false)
  }

  // if spinning, start dice animation
  // if stopped spinning, reset dice animation
  useEffect(() => {
    if (state.isPending === true) {
      setDiceSpinning()
    }
  }, [state.isPending])

  useEffect(() => {
    if (state.isSpinning === true) {
      startDiceAnimation()
      return
    }
    resetDiceAnimation()
  }, [state.isSpinning])

  // generate a random duration every new spin
  useEffect(() => {
    if (state.isSpinning === false) {
      setDiceDuration(generateFullDiceDuration())
    }
  }, [state.isSpinning])

  return (
    <HStack
      spacing={{
        base: 8,
        md: 16
      }}
      w='100%'
      h='100%'
      align='center'
      justify='center'
    >
      <ControlledRouletteDice
        showGlow={showDiceOneGlow}
        isSpinning={diceOneSpinning}
        number={data?.diceOne}
        controls={diceOneControls}
        variants={diceVariants}
        index={0}
      />
      <ControlledRouletteDice
        showGlow={showDiceTwoGlow}
        isSpinning={diceTwoSpinning}
        number={data?.diceTwo}
        controls={diceTwoControls}
        variants={diceVariants}
        index={1}
      />
      <ControlledRouletteDice
        showGlow={showDiceThreeGlow}
        isLastDice
        isSpinning={diceThreeSpinning}
        number={data?.diceThree}
        controls={diceThreeControls}
        variants={diceVariants}
        index={2}
      />
    </HStack>
  )
}
