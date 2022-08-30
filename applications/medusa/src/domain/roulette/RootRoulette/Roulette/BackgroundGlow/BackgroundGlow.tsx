import { chakra } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

interface Props {
  colorScheme?: string
  isVisible?: boolean
}

export default function BackgroundGlow (props: Props): JSX.Element {
  const {
    colorScheme = 'green',
    isVisible = true
  } = props

  const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
  })

  // TODO add 3 different glow patterns to choose from so it's random for each dice
  // TODO need a slimmer "glow" for smaller objects like dice
  // TODO add AnimatePresence and variable for hiding the glow
  // TODO initial will scale from 0 to 1, opacity 0 to 1
  // TODO exit will scale from null to 1, opacity 1 to 0

  // TODO add a randomizer that will start the pattern at random

  const variants = {
    initial: {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 6
    },
    exit: {
      scale: [1, 0],
      opacity: [1, 0],
      duration: 0.1
    },
    visibleOne: {
      scale: 1,
      opacity: 1
    },
    visibleTwo: {
      rotate: 25,
      scale: 1,
      opacity: 1
    },
    visibleThree: {
      rotate: 75,
      scale: 1,
      opacity: 1
    }
  }

  const gradient = `radial(circle,${colorScheme}.500 0,${colorScheme}.200 30%,${colorScheme}.200 50%,${colorScheme}.400 80%, transparent 100%)`

  const DEFAULT_GLOW_PROPS = {
    top: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '5%',
    pointerEvents: 'none',
    bgGradient: gradient,
    filter: 'blur(10px)'
  }

  return (
    <>
      {isVisible && (
        <>
          <MotionBox
            layout
            initial='visibleOne'
            key={0}
            {...DEFAULT_GLOW_PROPS}
            // @ts-expect-error
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            animate={{
              scale: [0.9, 1.05, 1, 0.9]
            }}
            variants={variants}
            exit='exit'
          />
          <MotionBox
            layout
            key={1}
            {...DEFAULT_GLOW_PROPS}
            initial='visibleTwo'
            // @ts-expect-error
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            animate={{
              scale: [1.07, 0.9, 1, 1.07]
            }}
            variants={variants}
            exit='exit'
          />
          <MotionBox
            layout
            key={2}
            {...DEFAULT_GLOW_PROPS}
            initial='visibleThree'
            // @ts-expect-error
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            animate={{
              scale: [1.09, 0.9, 1, 1.09]
            }}
            variants={variants}
            exit='exit'
          />
        </>
      )}
    </>
  )
}
