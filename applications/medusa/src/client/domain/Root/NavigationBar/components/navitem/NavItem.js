/**
 * @flow
 */

import {
  Flex, Tooltip
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'

type Props = {
  icon: () => void,
  label: string,
  route: string,
  selected: boolean,
}

export default function NavItem ({ route, icon, selected, label }: Props): Node {
  return (
    <Link to={route}>
      <Tooltip hasArrow label={label} placement='bottom'>
        <Flex
          borderRadius={10}
          bg={selected ? 'gray.500' : 'transparent'}
          mt={2} mb={2} w='58px' h='40px' pl={4} pr={4}
          aria-label={label}
          position='relative'
        >
          <Icon
            icon={icon} w='fill' h='fill'
            fill={selected ? 'gray.100' : 'gray.300'}
          />
        </Flex>
      </Tooltip>
    </Link>
  )
}
