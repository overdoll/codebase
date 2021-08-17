/**
 * @flow
 */

import {
  Flex, Tooltip
} from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import Icon from '@//:modules/content/Icon/Icon'
import { useLocation } from '@//:modules/routing'
import getBasePath from '../../../../helpers/getBasePath'

type Props = {
  icon: () => void,
  label: string,
  path: string,
  exact: boolean
}

export default function NavigationButton ({ path, icon, label, exact }: Props): Node {
  const location = useLocation()

  const match = getBasePath(location.pathname) === getBasePath(path)

  return (
    <NavLink exact={exact} to={path}>
      {(isActive) => (
        <Tooltip hasArrow label={label} placement='bottom'>
          <Flex
            borderRadius={10}
            bg={match ? 'gray.500' : 'transparent'}
            w='58px' h='38px'
            aria-label={label}
            position='relative'
            justify='center'
          >
            <Icon
              icon={icon} w='fill' h='fill' p={2}
              fill={match ? 'gray.100' : 'gray.300'}
            />
          </Flex>
        </Tooltip>
      )}
    </NavLink>
  )
}
