/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Flex
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Link from '@//:modules/routing/Link'
import { useHistory } from '@//:modules/routing'
import { useFlash } from '@//:modules/flash'
import InterfaceLock
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/lock-unlock/interface-lock.svg'

type Props = {
  currentRoute: string,
  user: boolean,
  navRoute: string,
  iconActive: any,
  iconInactive: any,
  label: string,
  loginRequired: boolean,
  locked: boolean,
  onInteract: () => void,
}

export default function MainNav ({ user, navRoute, iconActive, iconInactive, locked, currentRoute, label, loginRequired, onInteract }: Props): Node {
  const [t] = useTranslation('nav')
  const history = useHistory()

  const { flash } = useFlash()

  const selected = currentRoute === navRoute

  const checkLogin = () => {
    if (locked && !user) {
      flash('login.notify', t('upload_locked'))
      history.push('/join')
    }
  }

  if (loginRequired) {
    if (!user) {
      return null
    }
  }

  return (
    <Link to={locked && !user ? '/join' : navRoute}>
      <Flex
        borderRadius={10}
        bg={selected ? 'gray.500' : 'transparent'}
        mt={2} mb={2} w='58px' h='40px' pl={4} pr={4}
        aria-label={label}
        position='relative'
        onClick={
          () => {
            checkLogin()
            onInteract()
          }
        }
      >
        <Icon
          icon={selected ? iconActive : iconInactive} w='fill' h='fill'
          color={selected ? 'transparent' : 'gray.300'}
          fill={selected ? 'gray.100' : 'transparent'}
        />
        <Icon
          position='absolute'
          display={locked && !user ? 'flex' : 'none'}
          bottom={1}
          right={3}
          icon={InterfaceLock} w='12px' h='12px'
          fill='orange.300'
        />
      </Flex>
    </Link>
  )
}
