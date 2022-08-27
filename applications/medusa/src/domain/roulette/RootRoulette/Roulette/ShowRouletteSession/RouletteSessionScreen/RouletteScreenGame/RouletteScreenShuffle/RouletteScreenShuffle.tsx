import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenShuffleFragment$key } from '@//:artifacts/RouletteScreenShuffleFragment.graphql'
import type { RouletteScreenShuffleViewerFragment$key } from '@//:artifacts/RouletteScreenShuffleViewerFragment.graphql'
import { graphql } from 'react-relay'
import RouletteScreenPost from '../RouletteScreenPost/RouletteScreenPost'
import { Flex } from '@chakra-ui/react'
import RouletteScreenBackground from '../RouletteScreenBackground/RouletteScreenBackground'
import { motion, useAnimation } from 'framer-motion'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useEffect, useState } from 'react'

interface Props {
  query: RouletteScreenShuffleFragment$key
  viewerQuery: RouletteScreenShuffleViewerFragment$key | null
}

const Fragment = graphql`
  fragment RouletteScreenShuffleFragment on RouletteStatus {
    gameState @required(action: THROW) {
      diceOne
      diceTwo
      diceThree
      post {
        id
        ...RouletteScreenPostFragment
        ...RouletteScreenBackgroundFragment
      }
      ...RouletteScreenDiceFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment RouletteScreenShuffleViewerFragment on Account {
    ...RouletteScreenPostViewerFragment
  }
`

export default function RouletteScreenShuffle (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const {
    state
  } = useSequenceContext()

  const shuffleControls = useAnimation()

  const diceRolls = data.gameState != null ? [data.gameState.diceOne, data.gameState.diceThree, data.gameState.diceTwo] : [1, 2, 3]

  const [respin, setRespin] = useState(false)

  const isReSpin = !(new Set(diceRolls).size === diceRolls.length) && !(diceRolls.every(val => val === diceRolls[0]))

  const variants = {
    pending: {
      x: 2000,
      transition: {
        duration: 0.3
      }
    },
    spinning: {
      x: [-2000, 0],
      transition: {
        duration: 0.35
      }
    },
    reset: {
      x: [null, 0],
      transition: {
        duration: 0.1
      }
    }
  }

  useEffect(() => {
    if (state.isPending === true) {
      if (respin) return
      void shuffleControls.start('pending')
    }
  }, [state.isPending, isReSpin])

  useEffect(() => {
    if (state.isSpinning === true) {
      if (respin) return
      void shuffleControls.start('spinning')
      return
    }
    void shuffleControls.start('reset')
  }, [state.isSpinning])

  useEffect(() => {
    setRespin(isReSpin)
  }, [data.gameState.post.id, data.gameState])

  return (
    <Flex w='100%' h='100%' position='relative'>
      <RouletteScreenBackground query={data.gameState.post} />
      <motion.div
        // @ts-expect-error
        variants={variants}
        animate={shuffleControls}
        style={{
          position: 'relative'
        }}
      >
        <RouletteScreenPost query={data.gameState.post} viewerQuery={viewerData} />
      </motion.div>
    </Flex>
  )
}
