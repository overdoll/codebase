import { ReactNode, useEffect, useRef, useState } from 'react'
import { Fade, Flex, Heading, HStack } from '@chakra-ui/react'
import { Icon } from '../../../../../../PageLayout'
import { ActionUnlock } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Timeout } from '@//:types/components'

interface Props {
  children: ReactNode
  isActive: boolean
}

export default function SupporterUnlocked (props: Props): JSX.Element {
  const {
    children,
    isActive
  } = props

  const [open, setOpen] = useState(false)

  const timeoutRef = useRef<Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    if (isActive) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 3000)
    } else {
      setOpen(true)
    }
  }, [isActive])

  return (
    <Flex h='100%' w='100%' position='relative'>
      {children}
      <Flex pointerEvents='none' top={4} align='center' justify='center' w='100%' position='absolute'>
        <Fade in={open}>
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
        </Fade>
      </Flex>
    </Flex>
  )
}
