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
import IconButton from '@//:modules/form/IconButton'

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
          <Flex>
            <IconButton
              icon={
                <Icon
                  icon={icon} w='58px' h='38px' p={2}
                  fill={match ? 'gray.100' : 'gray.300'}
                />
              }
              aria-label={label} w='58px' h='38px' variant='unstyled' bg={match ? 'gray.500' : 'transparent'}
            />
          </Flex>
        </Tooltip>
      )}
    </NavLink>
  )
}
