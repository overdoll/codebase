import { chakra } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

export default function RouletteDice (): JSX.Element {
  const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
  })

  return (
    <MotionBox
      // @ts-expect-error
      transition={{
        duration: 2,
        repeat: Infinity
      }}
      bgGradient='radial(circle,green.500 0,green.200 30%,green.200 50%,green.400 80%, transparent 100%)'
      filter='blur(10px)'
    />
  )
}
