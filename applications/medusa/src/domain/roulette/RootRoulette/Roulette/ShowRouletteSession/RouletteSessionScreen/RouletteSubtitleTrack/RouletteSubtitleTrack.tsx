import { graphql, useFragment } from 'react-relay/hooks'
import { RouletteSubtitleTrackFragment$key } from '@//:artifacts/RouletteSubtitleTrackFragment.graphql'
import { Flex, GridItem, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { motion, useAnimationControls } from 'framer-motion'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  query: RouletteSubtitleTrackFragment$key
}

const Fragment = graphql`
  fragment RouletteSubtitleTrackFragment on RouletteStatus {
    gameState {
      id
      diceOne
      diceTwo
      diceThree
    }
  }
`

export default function RouletteSubtitleTrack (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const {
    state
  } = useSequenceContext()

  const trackControls = useAnimationControls()

  const [subtitleTrack, setSubtitleTrack] = useState('...')
  const [currentState, setCurrentState] = useState('pending')

  const PENDING_SUBTITLES = ['...']

  const SPINNING_SUBTITLES = [
    i18n._(t`What will you get this time?`),
    i18n._(t`Keep spinning. It's the only way.`),
    i18n._(t`The dice will lead the way.`),
    i18n._(t`What do the dice tell you?`),
    i18n._(t`Not this time. Not again.`),
    i18n._(t`Let's hope this works out for you.`),
    i18n._(t`How many spins are we on? I lost count.`),
    i18n._(t`Spin 3,842. Have to keep going.`),
    i18n._(t`Clicking the button again will skip the spin.`),
    i18n._(t`I can't really say.`),
    i18n._(t`You know you can skip. But you won't.`),
    i18n._(t`This is the last straw.`),
    i18n._(t`It's too much to handle.`),
    i18n._(t`Wait for it.`),
    i18n._(t`The spins matter.`),
    i18n._(t`Maybe you'll get it this time.`)
  ]

  const SINGLES_SUBTITLES = [
    i18n._(t`No combos. Spin again.`),
    i18n._(t`You're safe, for now. Try spinning again.`),
    i18n._(t`At this rate, you'll never lose. Keep spinning.`),
    i18n._(t`Don't get distracted now. Spin.`),
    i18n._(t`You're too close to quit now. Keep going.`),
    i18n._(t`Spin. Spin. Spin. Spin.`),
    i18n._(t`You're not focused. Get your head in the game. Spin.`),
    i18n._(t`Big green button. You know what to do.`),
    i18n._(t`This is my favorite post. But you have to keep going.`),
    i18n._(t`Come on. Just one more spin.`),
    i18n._(t`You'll get it next time. Don't worry and keep spinning.`),
    i18n._(t`No harm in spinning again. Right?`),
    i18n._(t`Nothing yet. Again.`)
  ]

  const DOUBLES_SUBTITLES = [
    i18n._(t`It's a double. Re-spin and hope you don't lose.`),
    i18n._(t`You got a double. You can re-spin, at least for now.`),
    i18n._(t`That was close! It's a re-spin.`),
    i18n._(t`Lucky. Don't let it run out. Re-spin.`)
  ]

  const TRIPLES_SUBTITLES = [
    i18n._(t`You got a triple. You HAVE to lose to this post.`),
    i18n._(t`It's a triple. Don't back out. Lose to the post.`),
    i18n._(t`Triple. You know what to do.`),
    i18n._(t`A triple. And you got a good post too. Lucky you.`),
    i18n._(t`Triple. Don't disappoint me.`)
  ]

  const diceRolls = data.gameState != null ? [data.gameState.diceOne, data.gameState.diceThree, data.gameState.diceTwo] : [1, 2, 3]

  const SUBTITLE_STATES = {
    pending: PENDING_SUBTITLES,
    spinning: SPINNING_SUBTITLES,
    singles: SINGLES_SUBTITLES,
    doubles: DOUBLES_SUBTITLES,
    triples: TRIPLES_SUBTITLES
  }

  const getCurrentState = (): string => {
    if (data.gameState == null) {
      return 'pending'
    }
    if (state.isPending === true) {
      return 'pending'
    }
    if (state.isSpinning === true) {
      return 'spinning'
    }
    if (new Set(diceRolls).size === diceRolls.length) {
      return 'singles'
    }
    if (diceRolls.every(val => val === diceRolls[0])) {
      return 'triples'
    }

    return 'doubles'
  }

  const variants = {
    play: {
      opacity: [0, 1],
      duration: 0.34
    }
  }

  const getSubtitleTrack = (state): string => {
    return SUBTITLE_STATES[state][Math.floor(Math.random() * SUBTITLE_STATES[state].length)]
  }

  useUpdateEffect(() => {
    void trackControls.start('play')
    const currentState = getCurrentState()
    setSubtitleTrack(getSubtitleTrack(currentState))
    setCurrentState(currentState)
  }, [state.isSpinning, state.isPending])

  return (
    <GridItem>
      <Flex
        bg='dimmers.100'
        w='100%'
        h='100%'
        align='flex-end'
        justify='center'
      >
        <motion.div
          animate={trackControls}
          variants={variants}
        >
          <Text
            noOfLines={1}
            textAlign='center'
            fontWeight={currentState === 'triples' ? 'semibold' : (currentState === 'doubles' ? 'semibold' : 'normal')}
            fontSize={subtitleTrack.length > 45 ? 'sm' : 'md'}
            color={currentState === 'triples' ? 'red.400' : (currentState === 'doubles' ? 'orange.300' : 'whiteAlpha.800')}
          >
            {subtitleTrack}
          </Text>
        </motion.div>
      </Flex>
    </GridItem>
  )
}
