/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { MenuItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import NavLink from '@//:modules/routing/NavLink'

type Props = {
  path: string,
  label: string,
  icon: () => void,
}

export default function MenuItemButton ({ path, label, icon }: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to={path}>
      {({ isActiveBasePath }) => (
        <MenuItem bg={isActiveBasePath ? 'gray.700' : 'gray.800'}>
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
