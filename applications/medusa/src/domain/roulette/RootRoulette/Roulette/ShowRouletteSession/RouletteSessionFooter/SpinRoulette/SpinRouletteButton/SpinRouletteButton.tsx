import { Heading, IconButtonProps, Kbd, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { ArrowRoundRight, ControlFastForward, ControlPlayButton } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { motion, useAnimationControls } from 'framer-motion'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useEffect } from 'react'
import BackgroundGlow from '../../../../BackgroundGlow/BackgroundGlow'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  canFastForward?: boolean
  isReSpin?: boolean
  showSpinConfirm?: boolean
}

export default function SpinRouletteButton (props: Props): JSX.Element {
  const {
    isDisabled = false,
    canFastForward = false,
    isReSpin = false,
    showSpinConfirm = false,
    ...rest
  } = props

  const { i18n } = useLingui()

  // TODO remove layout shift that happens when button is resized from animation

  const allowAnimation = !isDisabled && !canFastForward

  const canFastForwardCheck = canFastForward && !isDisabled

  const bounceControls = useAnimationControls()

  const BUTTON_ICON = (
    <Icon
      fill='gray.00'
      w={{
        base: 10,
        md: 16
      }}
      h={{
        base: 10,
        md: 16
      }}
      icon={(canFastForwardCheck) ? ControlFastForward : (isReSpin ? ArrowRoundRight : ControlPlayButton)}
    />
  )

  const DEFAULT_BUTTON_PROPS = {
    'aria-label': i18n._(t`Spin Roulette`),
    icon: BUTTON_ICON,
    borderRadius: '25%',
    w: {
      base: 24,
      md: 36
    },
    h: {
      base: 24,
      md: 36
    }
  }

  useEffect(() => {
    if (allowAnimation) {
      void bounceControls.start({
        scale: [1, 1.07, 0.85, 1, 1.1, 0.9, 1]
      })
      return
    }
    bounceControls.stop()
  }, [allowAnimation])

  return (
    <motion.div
      animate={bounceControls}
      layoutScroll
      transition={{
        delay: 5,
        duration: 0.7,
        times: [0, 0.2, 0.4, 0.5, 0.7, 0.8, 1],
        ease: [0.17, 0.67, 0.83, 0.67],
        repeat: Infinity,
        repeatDelay: 3,
        bounce: 0.5
      }}
      style={{
        zIndex: 5,
        position: 'relative'
      }}
    >
      <BackgroundGlow isVisible={allowAnimation} colorScheme='green' />
      <Popover
        returnFocusOnClose={false}
        closeOnBlur={false}
        isOpen={showSpinConfirm}
      >
        <PopoverTrigger>
          <IconButton
            as={motion.button}
            layout
            whileTap={allowAnimation && {
              scale: [1, 0.85],
              transition: {
                duration: 0.1
              }
            }}
            {...DEFAULT_BUTTON_PROPS}
            {...rest}
            colorScheme={canFastForwardCheck ? 'gray' : 'green'}
            isDisabled={isDisabled}
          />
        </PopoverTrigger>
        <PopoverContent bg='dimmers.700' p={4}>
          <Heading fontSize='lg' color='red.300'>
            <Trans>
              You lost the roulette! Tap on the button or hit <Kbd borderColor='red.300'>SPACE</Kbd> to
              start a new
              game.
            </Trans>
          </Heading>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
