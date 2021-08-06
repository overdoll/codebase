/**
 * @flow
 */

import {
  Flex, Tooltip
} from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import Icon from '@//:modules/content/Icon/Icon'

type Props = {
  icon: () => void,
  label: string,
  path: string,
  exact: boolean,
  match: boolean,
}

export default function TopNavigationButton ({ path, icon, label, exact, match }: Props): Node {
  return (
    <NavLink exact={exact} to={path}>
      {(isActive) => (
        <Tooltip hasArrow label={label} placement='bottom'>
          <Flex
            borderRadius={10}
            bg={match ? 'gray.500' : 'transparent'}
            mt={2} mb={2} w='58px' pl={4} pr={4}
            aria-label={label}
            position='relative'
          >
            <Icon
              icon={icon} w='fill' h='fill'
              fill={match ? 'gray.100' : 'gray.300'}
            />
          </Flex>
        </Tooltip>
      )}
    </NavLink>
  )
}
