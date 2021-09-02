/**
 * @flow
 */
import { Button, Flex, IconButton, Spacer } from '@chakra-ui/react'
import type { Node } from 'react'
import Link from '@//:modules/routing/Link'
import Icon from '@//:modules/content/Icon/Icon'
import { useHistory } from '@//:modules/routing'
import { useTranslation } from 'react-i18next'
import InterfaceArrowsTurnBackward
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-turn-backward.svg'

type Props = {
  children: Node
}

export default function SimplifiedNavigation ({ children }: Props): Node {
  const [t] = useTranslation('navigation')

  const history = useHistory()

  return (
    <>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      <Flex
        zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0} position='fixed' h='54px'
        bg='transparent'
      >
        <Link to='/'>
          <Button ml={2}>{t('title')}</Button>
        </Link>
        <Spacer />
        <IconButton
          onClick={() => history.goBack()}
          variant='solid'
          colorScheme='primary'
          size='md'
          mr={2}
          icon={
            <Icon
              icon={InterfaceArrowsTurnBackward} m={2} w='fill' h='fill' p={1}
              fill='gray.100'
            />
          }
        />
      </Flex>
      {children}
    </>
  )
}
