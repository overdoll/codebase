/**
 * @flow
 */
import type { Node } from 'react'
import type { State } from '@//:types/upload'
import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/button'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'

type Props = {
  state: State,
};

export default function Finish ({ state }: Props): Node {
  const [t] = useTranslation('upload')

  const history = useHistory()

  return (
    <Center mt={40}>
      <Flex w={['sm', 'md', 'lg']} direction='column'>
        <Icon
          icon={SignBadgeCircle}
          color='purple.500'
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading size='lg' align='center' color='gray.00'>
          {t('finish.review.header')}
        </Heading>
        <Text size='md' align='center' color='gray.100'>
          {t('finish.review.subheader')}
        </Text>
        <Center mt={8}>
          <Flex justify='space-between' direction='column' h='100%'>
            <Button
              size='xl'
              colorScheme='gray'
              variant='solid'
              onClick={() => {
                location.reload()
              }}
            >
              {t('finish.review.again')}
            </Button>

          </Flex>
          <Flex
            position='fixed'
            bottom={8}
          >
            <Button
              size='lg'
              colorScheme='gray'
              variant='ghost'
              onClick={() => {
                history.push('/profile')
              }}
            >
              {t('finish.review.home')}
            </Button>
          </Flex>
        </Center>
      </Flex>
    </Center>
  )
}
