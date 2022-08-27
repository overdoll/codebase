import RouletteDice from './RouletteDice/RouletteDice'
import { AnimationControls, motion } from 'framer-motion'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useEffect } from 'react'
import { useUpdateEffect } from '@chakra-ui/react'

interface Props {
  number: number | undefined
  controls: AnimationControls
  variants: any
  index: number
  isSpinning: boolean
  isLastDice?: boolean
  showGlow?: boolean
}

export default function ControlledRouletteDice (props: Props): JSX.Element {
  const {
    number,
    controls,
    variants,
    index,
    isSpinning,
    isLastDice = false,
    showGlow = true
  } = props

  const {
    state
  } = useSequenceContext()

  const rotateAnimation = [
    [3, -7, 0],
    [-7, 0, 3, 0],
    [5, 0]
  ]

  const positionAnimation = [
    {
      x: -3,
      y: -7,
      rotate: 6
    },
    {
      x: -3,
      y: 10,
      rotate: 21
    },
    {
      x: 4,
      y: -10,
      rotate: -33
    }
  ]

  const diceVariants = {
    pending: {
      scale: [null, 0.8, 1],
      x: [null, 0],
      y: [null, 0],
      rotate: [null, 0],
      transition: {
        duration: 0.3
      }
    },
    exit: {
      scale: [null, 1.1, 1.2],
      x: [null, 0],
      y: [null, 0],
      rotate: rotateAnimation[index],
      transition: {
        duration: 0.5,
        onComplete: () => {
          if (isLastDice) {
            void controls.start('reset')
          }
        },
        rotate: {
          type: 'spring',
          bounce: 0.1,
          duration: 0.1
        }
      }
    },
    reset: {
      scale: [null, 1.2],
      rotate: [null, 0],
      x: [null, 0],
      y: [null, 0],
      transition: {
        duration: 0.1
      }
    },
    floor: {
      ...positionAnimation[index]
    },
    initial: {
      scale: 1.2
    },
    ...variants
  }

  const startPending = (): void => {
    if (isLastDice) {
      void controls.start('reset')
    }
    void controls.start('pending')
  }

  const resetDice = (): void => {
    void controls.start('reset')
  }

  useEffect(() => {
    if (state.isPending === true) {
      startPending()
    }
  }, [state.isPending])

  useEffect(() => {
    if (state.isSpinning === true) return
    if (number == null) return
    resetDice()
  }, [state.isSpinning])

  useUpdateEffect(() => {
    if (number == null) {
      void controls.start('floor')
    }
  }, [number])

  return (
    <motion.div
      initial={number == null ? 'floor' : 'initial'}
      variants={diceVariants}
      animate={controls}
      style={{
        zIndex: 5
      }}
    >
      <RouletteDice
        showGlow={showGlow}
        number={number}
        numberCycleVariant={index}
        isSpinning={isSpinning}
      />
    </motion.div>
  )
}
