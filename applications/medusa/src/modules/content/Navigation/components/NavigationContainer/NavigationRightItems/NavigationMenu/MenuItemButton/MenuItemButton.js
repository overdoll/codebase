/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { MenuItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import NavLink from '@//:modules/routing/NavLink'
import { useLocation } from '@//:modules/routing'
import getBasePath from '../../../../../helpers/getBasePath'

type Props = {
  path: string,
  label: string,
  icon: () => void,
}

export default function MenuItemButton ({ path, label, icon }: Props): Node {
  const [t] = useTranslation('navigation')

  const location = useLocation()

  const match = getBasePath(location.pathname) === getBasePath(path)

  return (
    <NavLink to={path}>
      {(isActive) => (
        <MenuItem bg={match ? 'gray.700' : 'gray.800'}>
          <Icon
            pointerEvents='none'
            icon={icon} w='38px' h='38px' p={2}
            fill='gray.100' mr={2}
          />
          <Text pointerEvents='none' color='gray.100' size='md'>{t(label)}</Text>
        </MenuItem>
      )}
    </NavLink>
  )
}
