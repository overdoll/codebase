/**
 * @flow
 */
import { IconButton } from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'

type Props = {}

export default function LoginMenu (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <Link to='/join'>
      <IconButton
        bg='transparent'
        borderRadius={10}
        h='42px' w='42px' mr={1}
        display={['none', 'none', 'flex']}
        aria-label={t('nav.profile')}
        icon={<Icon icon={Login2} fill='gray.300' w='38px' m={1} h='38px' />}
      />
    </Link>
  )
}
