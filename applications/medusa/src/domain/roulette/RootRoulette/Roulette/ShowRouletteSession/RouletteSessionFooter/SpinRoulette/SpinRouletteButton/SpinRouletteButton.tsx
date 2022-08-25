import { Box, chakra, IconButtonProps } from '@chakra-ui/react'
import { ControlFastForward, ControlPlayButton } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { isValidMotionProp, motion, useAnimation } from 'framer-motion'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useEffect } from 'react'

interface Props extends Omit<IconButtonProps, 'aria-label'> {
  canFastForward?: boolean
}

export default function SpinRouletteButton (props: Props): JSX.Element {
  const {
    isDisabled,
    canFastForward = false,
    ...rest
  } = props

  // TODO button glows and rainbow outline when spinning is ready
  // TODO replay icon when game is finished

  const { i18n } = useLingui()

  const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
  })

  // TODO remove layout shift that happens when window is resized

  const allowAnimation = isDisabled === false && !canFastForward

  const bounceControls = useAnimation()

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
      icon={(canFastForward && isDisabled === false) ? ControlFastForward : ControlPlayButton}
    />
  )

  const DEFAULT_BUTTON_PROPS = {
    'aria-label': i18n._(t`Spin Roulette`),
    colorScheme: 'green',
    icon: BUTTON_ICON,
    borderRadius: '25%',
    w: {
      base: 24,
      md: 36
    },
    h: {
      base: 24,
      md: 36
    },
    isDisabled
  }

  const DEFAULT_GLOW_PROPS = {
    top: 0,
    right: 0,
    left: 0,
    w: '100%',
    h: '100%',
    position: 'absolute',
    borderRadius: '5%',
    pointerEvents: 'none'
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
      transition={{
        delay: 5,
        duration: 0.7,
        times: [0, 0.2, 0.4, 0.5, 0.7, 0.8, 1],
        ease: [0.17, 0.67, 0.83, 0.67],
        repeat: Infinity,
        repeatDelay: 3,
        bounce: 0.5
      }}
    >
      <Box position='relative'>
        {allowAnimation && (
          <>
            <MotionBox
              {...DEFAULT_GLOW_PROPS}
              // @ts-expect-error
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              animate={{
                scale: [0.9, 1.05, 1, 0.9],
                opacity: 1
              }}
              bgGradient='radial(circle,green.500 0,green.200 30%,green.200 50%,green.400 80%, transparent 100%)'
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
                scale: [1.07, 0.9, 1, 1.07],
                opacity: 1
              }}
              bgGradient='radial(circle,green.500 0,green.200 30%,green.200 50%,green.400 80%, transparent 100%)'
              filter='blur(10px)'
            />
            <MotionBox
              {...DEFAULT_GLOW_PROPS}
              initial={{
                rotate: 75
              }}
              // @ts-expect-error
              transition={{
                duration: 4,
                repeat: Infinity
              }}
              animate={{
                scale: [1.09, 0.9, 1, 1.09],
                opacity: 1
              }}
              bgGradient='radial(circle,green.500 0,green.200 30%,green.200 50%,green.400 80%, transparent 100%)'
              filter='blur(12px)'
            />
          </>
        )}
        <IconButton
          as={motion.button}
          whileTap={{
            scale: [1, 0.85],
            transition: {
              duration: 0.1
            }
          }}
          {...DEFAULT_BUTTON_PROPS}
          {...rest}
        />
      </Box>
    </motion.div>
  )
}
