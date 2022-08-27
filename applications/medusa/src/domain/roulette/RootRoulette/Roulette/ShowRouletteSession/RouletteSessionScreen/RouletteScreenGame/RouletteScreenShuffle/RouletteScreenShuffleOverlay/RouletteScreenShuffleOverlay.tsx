import { Flex } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { motion } from 'framer-motion'

export default function RouletteScreenShuffleOverlay (): JSX.Element {
  const {
    state
  } = useSequenceContext()

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2
      }}
    >
      <Flex
        w='100%'
        h='100%'
        opacity={0.5}
        bg='gray.800'
        backdropFilter='blur(5px)'
      />
    </motion.div>
  )
}
