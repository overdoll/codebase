import { ReactNode, useEffect, useRef, useState } from 'react'
import { Fade, Flex, Heading, HStack } from '@chakra-ui/react'
import { useSwiperSlide } from 'swiper/react'
import { Timeout } from '@//:types/components'
import { Icon } from '../../../../../PageLayout'
import { ActionUnlock } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  children: ReactNode
}

export default function PostSupporterContentUnlocked ({
  children
}: Props): JSX.Element {
  const timeoutRef = useRef<Timeout | null>(null)

  const [showNotice, setShowNotice] = useState(true)

  const { isActive } = useSwiperSlide()

  /*

  const animateGlow = keyframes`
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  `

  const GLOW = {
    bgGradient: 'linear(to-r,orange.300,orange.300,transparent,transparent,orange.300,orange.300,)',
    backgroundSize: '200% 200%',
    animation: `${animateGlow} 10s linear infinite`,
    transform: 'scale(0.96) translateZ(0)',
    filter: 'blur(12px)'
  }

   */

  const SupporterBadge = (
    <HStack
      mt={2}
      mb={2}
      py={2}
      px={3}
      justify='center'
      align='center'
      spacing={[1, 2]}
      bg='dimmers.500'
      borderRadius='md'
    >
      <Icon
        icon={ActionUnlock}
        fill='orange.300'
        h={[2, 4]}
        w={[2, 4]}
      />
      <Heading
        lineHeight={1}
        fontSize={['xs', 'md']}
        color='orange.300'
      >
        <Trans>
          Exclusive Supporter Content Unlocked
        </Trans>
      </Heading>
    </HStack>
  )

  useEffect(() => {
    const clearCurrentTimeout = (): void => {
      if (timeoutRef?.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }

    const timeoutSlide = (): void => {
      setShowNotice(false)
    }

    if (isActive) {
      setShowNotice(true)
      timeoutRef.current = setTimeout(timeoutSlide, 500)
      return
    } else {
      clearCurrentTimeout()
    }

    return () => {
      clearCurrentTimeout()
    }
  }, [isActive])

  return (
    <Flex h='100%' w='100%' position='relative'>
      {children}
      <Flex top={4} align='center' justify='center' w='100%' position='absolute'>
        <Fade unmountOnExit in={showNotice}>
          {SupporterBadge}
        </Fade>
      </Flex>
    </Flex>
  )
}
