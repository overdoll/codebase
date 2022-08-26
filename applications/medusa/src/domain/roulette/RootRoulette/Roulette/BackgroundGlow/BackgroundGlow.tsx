import { chakra } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

interface Props {
  colorScheme?: string
}

export default function BackgroundGlow (props: Props): JSX.Element {
  const { colorScheme = 'green' } = props

  const DEFAULT_GLOW_PROPS = {
    top: 0,
    w: '100%',
    h: '100%',
    position: 'absolute',
    borderRadius: '5%',
    pointerEvents: 'none'
  }

  const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
  })

  // TODO add 3 different glow patterns to choose from so it's random for each dice
  // TODO need a slimmer "glow" for smaller objects like dice

  // TODO add a randomizer that will start the pattern at random

  const gradient = `radial(circle,${colorScheme}.500 0,${colorScheme}.200 30%,${colorScheme}.200 50%,${colorScheme}.400 80%, transparent 100%)`

  return (
    <>
      <MotionBox
        {...DEFAULT_GLOW_PROPS}
        // @ts-expect-error
        transition={{
          duration: 2,
          repeat: Infinity
        }}
        animate={{
          scale: [0.9, 1.05, 1, 0.9]
        }}
        bgGradient={gradient}
        filter='blur(10px)'
      />
      <MotionBox
        {...DEFAULT_GLOW_PROPS}
        initial={{
          rotate: 25
        }}
        // @ts-expect-error
        transition={{
          duration: 2,
          repeat: Infinity
        }}
        animate={{
          scale: [1.07, 0.9, 1, 1.07]
        }}
        bgGradient={gradient}
        filter='blur(10px)'
      />
      <MotionBox
        {...DEFAULT_GLOW_PROPS}
        initial={{
          rotate: 75
        }}
        // @ts-expect-error
        transition={{
          duration: 2,
          repeat: Infinity
        }}
        animate={{
          scale: [1.09, 0.9, 1, 1.09]
        }}
        bgGradient={gradient}
        filter='blur(12px)'
      />
    </>
  )
}
