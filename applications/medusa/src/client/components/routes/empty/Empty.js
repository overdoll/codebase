/**
 * @flow
 */
import type { Node } from 'react'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import { useTranslation } from 'react-i18next'
import { Button, Center, Flex, Heading, Stack } from '@chakra-ui/react'

export default function Empty (): Node {
  const [t] = useTranslation('empty')

  return (
    <Center mt={8}>
      <Flex w={['fill', 'sm']} direction='column'>
        <Icon
          icon={SignBadgeCircle}
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={5}
        />
        <Heading size='lg' align='center'>
          {t('empty.header')}
        </Heading>
        <Center mt={4}>
          <Stack direction={['column', 'row']} spacing='24px'>
            <Button
              onClick={() => {
                history.back()
              }}
            >
              {t('empty.leave')}
            </Button>
            <Button
              onClick={() => {
                history.back()
              }}
            >
              {t('empty.home')}
            </Button>
          </Stack>
        </Center>
      </Flex>
    </Center>
  )
}
