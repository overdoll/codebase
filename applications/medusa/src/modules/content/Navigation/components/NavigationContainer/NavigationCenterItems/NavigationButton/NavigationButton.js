/**
 * @flow
 */

import { Flex, Tooltip } from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import Icon from '@//:modules/content/Icon/Icon'
import IconButton from '@//:modules/form/IconButton'

type Props = {
  icon: () => void,
  label: string,
  path: string,
  exact: boolean
}

export default function NavigationButton ({ path, icon, label, exact }: Props): Node {
  return (
    <NavLink exact={exact} to={path}>
      {({ isActiveBasePath }) => (
        <Tooltip hasArrow label={label} placement='bottom'>
          <Flex>
            <IconButton
              icon={
                <Icon
                  icon={icon} w='58px' h='38px' p={2}
                  fill={isActiveBasePath ? 'gray.100' : 'gray.300'}
                />
              }
              aria-label={label} w='58px' h='38px' variant='unstyled' bg={isActiveBasePath ? 'gray.500' : 'transparent'}
            />
          </Flex>
        </Tooltip>
      )}
    </NavLink>
  )
}
