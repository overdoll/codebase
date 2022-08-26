import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenDiceFragment$key } from '@//:artifacts/RouletteScreenDiceFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, useUpdateEffect } from '@chakra-ui/react'
import RouletteDice from './RouletteDice/RouletteDice'
import { motion, useAnimation } from 'framer-motion'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useEffect, useState } from 'react'

interface Props {
  query: RouletteScreenDiceFragment$key | null
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

  const {
    state,
    dispatch
  } = useSequenceContext()

  const data = useFragment(Fragment, query)

  const containerControls = useAnimation()

  const dices = [data?.diceOne, data?.diceTwo, data?.diceThree]

  /*
  const orderDice = (): Array<number | undefined> => {
    if (data == null) {
      return dices
    }

    if (dices.every((e, i, a) => a.indexOf(e) === i)) {

      // figure out how to filter duplicates and

      const duplicates = dices.filter((e, i, a) => a.indexOf(e) !== i)

      const removeDuplicates = dices.filter((e, i, a) => a.indexOf(e) === i)

      console.log(removeDuplicates)

      return [...duplicates, ...removeDuplicates]
    }

    return dices
  }

   */

  const [diceSpinning, setDiceSpinning] = useState([false, false, false])

  const diceReveals = {
    slow: {
      scale: [1, 1.2, 1.5, 1.2],
      transition: {
        duration: 3,
        times: [0, 0.8, 0.9, 1]
      }
    }
  }

  const diceVariants = {
    pending: {
      scale: [null, 0.8, 1],
      transition: {
        duration: 0.5
      }
    },
    spinning: i => ({
      rotate: [null, 0],
      ...diceReveals.slow
    }),
    reset: {
      scale: [null, 1],
      rotate: [null, 0],
      transition: {
        duration: 0.1
      }
    }
  }

  const containerVariants = {
    pending: {},
    spinning: {
      transition: {
        staggerChildren: 3
      }
    },
    reset: {
      transition: {
        duration: 0.1
      }
    }
  }

  const startPending = (): void => {
    setDiceSpinning([true, true, true])
    void containerControls.start('pending')
  }

  const startSpinning = (): void => {
    void containerControls.start('spinning')
  }

  const completeSpinning = (): void => {
    dispatch({
      type: 'isSpinning',
      value: false,
      transform: 'SET'
    })
  }

  const completeAnimation = (i): void => {
    setDiceSpinning(x => x.map((item, index) => index === i ? false : item))
  }

  useUpdateEffect(() => {
    if (diceSpinning.every((x) => !x)) {
      completeSpinning()
    }
  }, [diceSpinning])

  useEffect(() => {
    if (state.isPending === true) {
      startPending()
    }
  }, [state.isPending, setDiceSpinning])

  useEffect(() => {
    if (state.isSpinning === true) {
      startSpinning()
      return
    }
    setDiceSpinning([false, false, false])
    void containerControls.start('reset')
  }, [state.isSpinning, setDiceSpinning])

  return (
    <Flex w='100%' h='100%' align='center' justify='center'>
      <motion.div
        animate={containerControls}
        variants={containerVariants}
        style={{
          display: 'flex'
        }}
      >
        {dices.map((item, index) => (
          <motion.div
            key={index}
            // @ts-expect-error
            variants={diceVariants}
            onAnimationComplete={() => completeAnimation(index)}
            style={{
              marginLeft: 16,
              marginRight: 16
            }}
          >
            <RouletteDice
              numberCycleVariant={index}
              isSpinning={diceSpinning[index]}
              number={item}
              key={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </Flex>
  )
}
