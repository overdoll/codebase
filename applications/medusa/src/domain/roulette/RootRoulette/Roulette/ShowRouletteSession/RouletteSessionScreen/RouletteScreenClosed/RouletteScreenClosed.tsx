import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenClosedFragment$key } from '@//:artifacts/RouletteScreenClosedFragment.graphql'
import { graphql } from 'react-relay'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Heading, HStack, Stack, useUpdateEffect } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { Trans } from '@lingui/macro'

interface Props {
  query: RouletteScreenClosedFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenClosedFragment on RouletteStatus {
    gameSession {
      isClosed
    }
  }
`

export default function RouletteScreenClosed (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const {
    state
  } = useSequenceContext()

  const controls = useAnimation()

  const showGameFinished = state.isPending === false && state.isSpinning === false && data.gameSession.isClosed

  const [manualClose, setManualClose] = useState(false)

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 200
    },
    show: {
      opacity: [0, 1],
      y: [200, 0],
      transition: {
        duration: 0.7,
        staggerChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 1],
      transition: {
        duration: 0.4
      }
    }
  }

  useEffect(() => {
    if (showGameFinished) {
      void controls.start('show')
      return
    }
    if (showGameFinished) {
      setManualClose(false)
    }
    void controls.start('hidden')
  }, [showGameFinished])

  useUpdateEffect(() => {
    if (manualClose) {
      void controls.start('hidden')
    }
  }, [manualClose])

  // lost to (icon) (character) by (icon) (club)
  // your score
  // share and compare your score with others
  // some sort of fake score and graph

  return (
    <motion.div
      initial='hidden'
      variants={containerVariants}
      animate={controls}
      style={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 2
      }}
    >
      <Stack
        borderTopRadius='lg'
        p={2}
        bg='dimmers.700'
        spacing={1}
        backdropFilter='auto'
        backdropBlur='5px'
      >
        <HStack align='center' justify='space-between'>
          <Heading fontSize='lg' color='gray.00'>
            <Trans>
              You Lost
            </Trans>
          </Heading>
          <CloseButton onClick={() => setManualClose(true)} />
        </HStack>
        <motion.div
          variants={itemVariants}
        >
          123
        </motion.div>
        <motion.div
          variants={itemVariants}
        >
          123
        </motion.div>
        <motion.div
          variants={itemVariants}
        >
          123
        </motion.div>
      </Stack>
    </motion.div>
  )
}
