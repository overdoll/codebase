/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import {
  Flex, Tooltip
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Link from '@//:modules/routing/Link'
import { useHistory } from '@//:modules/routing'
import { useFlash } from '@//:modules/flash'
import InterfaceLock
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/lock-unlock/interface-lock.svg'

type Props = {
  user: boolean,
  icon: () => void,
  label: string,
  loginRequired: boolean,
  locked: boolean,
  route: string,
}

export default function NavItem ({ user, route, icon, locked, selected, label, loginRequired }: Props): Node {
  const [t] = useTranslation('nav')

  const { flash } = useFlash()

  const checkLogin = () => {
    if (locked && !user) {
      flash('login.notify', t('upload_locked'))
    }
  }

  if (loginRequired) {
    if (!user) {
      return null
    }
  }

  return (
    <Link to={locked && !user ? '/join' : route}>
      <Tooltip hasArrow label={label} placement='bottom'>
        <Flex
          borderRadius={10}
          bg={selected ? 'gray.500' : 'transparent'}
          mt={2} mb={2} w='58px' h='40px' pl={4} pr={4}
          aria-label={label}
          position='relative'
          onClick={
            () => {
              checkLogin()
            }
          }
        >

          <Icon
            icon={icon} w='fill' h='fill'
            fill={selected ? 'gray.100' : 'gray.300'}
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
      </Tooltip>
    </Link>
  )
}
