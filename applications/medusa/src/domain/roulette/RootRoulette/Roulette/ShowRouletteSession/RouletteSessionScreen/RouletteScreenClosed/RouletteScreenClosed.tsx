import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenClosedFragment$key } from '@//:artifacts/RouletteScreenClosedFragment.graphql'
import { graphql } from 'react-relay'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Flex, Heading, HStack, Stack, useUpdateEffect } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import RoulettePostCharacter from './RoulettePostCharacter/RoulettePostCharacter'
import RoulettePostClub from './RoulettePostClub/RoulettePostClub'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowRoundRight, ControlPlayButton, RemoveCross } from '@//:assets/icons'
import RouletteClosedShareTwitterButton from './RouletteClosedShareTwitterButton/RouletteClosedShareTwitterButton'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import RouletteClosedShareRedditButton from './RouletteClosedShareRedditButton/RouletteClosedShareRedditButton'
import RouletteClosedShareDiscordButton from './RouletteClosedShareDiscordButton/RouletteClosedShareDiscordButton'

interface Props {
  query: RouletteScreenClosedFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenClosedFragment on RouletteStatus {
    gameSession {
      isClosed
    }
    gameState @required(action: THROW) {
      post {
        characters {
          ...RoulettePostCharacterFragment
        }
        club {
          ...RoulettePostClubFragment
        }
      }
    }
    score
    totalDoubles
    totalRolls
    ...RouletteClosedShareTwitterButtonFragment
    ...RouletteClosedShareRedditButtonFragment
    ...RouletteClosedShareDiscordButtonFragment
  }
`

export default function RouletteScreenClosed (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const {
    state
  } = useSequenceContext()

  const { i18n } = useLingui()

  const controls = useAnimationControls()

  const showGameFinished = state.isPending === false && state.isSpinning === false && data.gameSession.isClosed

  const [manualClose, setManualClose] = useState(false)

  const HEADING_PROPS = {
    fontSize: 'sm',
    color: 'whiteAlpha.500',
    fontWeight: 'normal'
  }

  const SCORE_HEADING_PROPS = {
    fontSize: 'xl',
    color: 'gray.00'
  }

  const SCORE_ICON_PROPS = {
    w: 4,
    h: 4,
    fill: 'gray.00'
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    show: {
      scale: [null, 1],
      opacity: [null, 1],
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

  return (
    <Flex
      pointerEvents={showGameFinished && !manualClose ? 'auto' : 'none'}
      position='absolute'
      zIndex={3}
      h='100%'
      w='100%'
      align='center'
      justify='center'
    >
      <motion.div
        initial='hidden'
        // @ts-expect-error
        variants={containerVariants}
        animate={controls}
      >
        <Stack
          borderRadius='lg'
          p={3}
          bg='dimmers.700'
          spacing={1}
          backdropFilter='auto'
          backdropBlur='5px'
          minW={200}
          align='center'
        >
          <motion.div
            variants={itemVariants}
          >
            <Heading {...HEADING_PROPS}>
              <Trans>
                Lost to
              </Trans>
            </Heading>
          </motion.div>
          <motion.div
            variants={itemVariants}
          >
            <Stack spacing={1}>
              {data.gameState.post.characters.map((item, index) => (
                <RoulettePostCharacter key={index} query={item} />
              ))}
            </Stack>
          </motion.div>
          <motion.div
            variants={itemVariants}
          >
            <Heading {...HEADING_PROPS}>
              <Trans>
                by
              </Trans>
            </Heading>
          </motion.div>
          <motion.div
            variants={itemVariants}
          >
            <RoulettePostClub query={data.gameState.post.club} />
          </motion.div>
          <motion.div
            variants={itemVariants}
          >
            <Heading {...HEADING_PROPS}>
              <Trans>
                Score
              </Trans>
            </Heading>
          </motion.div>
          <Stack align='center' justify='center' spacing={2}>
            <motion.div
              variants={itemVariants}
            >
              <Heading {...SCORE_HEADING_PROPS} fontSize='3xl'>
                {data.score}
              </Heading>
            </motion.div>
            <HStack align='center' justify='center' spacing={4}>
              <motion.div
                variants={itemVariants}
              >
                <Stack justify='center' spacing={2}>
                  <Icon icon={ControlPlayButton} {...SCORE_ICON_PROPS} />
                  <Heading {...SCORE_HEADING_PROPS}>
                    {data.totalRolls}
                  </Heading>
                </Stack>
              </motion.div>
              <motion.div
                variants={itemVariants}
              >
                <Stack justify='center' spacing={2}>
                  <Icon icon={ArrowRoundRight} {...SCORE_ICON_PROPS} />
                  <Heading {...SCORE_HEADING_PROPS}>
                    {data.totalDoubles}
                  </Heading>
                </Stack>
              </motion.div>
            </HStack>
          </Stack>
          <motion.div
            variants={itemVariants}
          >
            <HStack mt={2} spacing={2}>
              <RouletteClosedShareDiscordButton query={data} />
              <RouletteClosedShareRedditButton query={data} />
              <RouletteClosedShareTwitterButton query={data} />
              <SmallGenericButton
                colorScheme='gray'
                isIcon
                onClick={() => setManualClose(true)}
                icon={RemoveCross}
              >
                {i18n._(t`Share on Twitter`)}
              </SmallGenericButton>
            </HStack>
          </motion.div>
        </Stack>
      </motion.div>
    </Flex>
  )
}
