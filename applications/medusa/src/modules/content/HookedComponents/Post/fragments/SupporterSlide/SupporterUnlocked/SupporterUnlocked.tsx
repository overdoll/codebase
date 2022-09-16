import { ReactNode } from 'react'
import { Fade, Flex, Heading, HStack } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { ActionUnlock } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  children: ReactNode
}

export default function SupporterUnlocked (props: Props): JSX.Element {
  const { children } = props

  return (
    <Flex h='100%' w='100%' position='relative'>
      {children}
      <Flex top={4} align='center' justify='center' w='100%' position='absolute'>
        <Fade unmountOnExit in={showNotice}>
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
            pointerEvents='none'
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
