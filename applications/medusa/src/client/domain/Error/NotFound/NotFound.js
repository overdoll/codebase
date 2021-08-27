/**
 * @flow
 */
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useTranslation } from 'react-i18next'
import { Center, Flex, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { Helmet } from 'react-helmet-async'

export default function NotFound (): Node {
  const [t] = useTranslation('empty')

  return (
    <>
      <Helmet title='error' />
      <Center mt={40}>
        <Flex w={['sm', 'md', 'lg']} direction='column'>
          <Icon
            icon={SignBadgeCircle}
            color='primary.500'
            w={100}
            h={100}
            ml='auto'
            mr='auto'
            mb={8}
          />
          <Heading size='md' align='center' color='gray.00'>
            {t('empty.header')}
          </Heading>
          <Center mt={8}>
            <Stack direction={['column', 'row']} spacing='24px'>
              <Button
                size='lg'
                onClick={() => {
                  history.back()
                }}
              >
                {t('empty.leave')}
              </Button>
              <Button
                size='lg'
                colorScheme='primary'
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
    </>
  )
}
