/**
 * @flow
 */

import { Box, Tooltip } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  icon?: () => void,
  label: string,
  active: boolean,
  onClick?: () => void,
  children?: Node,
  w?: number,
  h?: number,
  as?: Node,
}

export default function NavigationButton ({ icon, label, active, onClick, children, w, h, as }: Props): Node {
  return (
    <Tooltip hasArrow label={label} placement='bottom'>
      <Box h='100%'>
        <ClickableBox
          p={0}
          onClick={onClick}
          borderRadius={{ base: 2, md: 10 }}
          aria-label={label}
          bg={active ? 'gray.500' : 'transparent'}
          h={h || { base: '48px', md: '42px' }}
          as={as}
        >
          {icon
            ? <Icon
                icon={icon} w={w || '58px'} h='38px' p={2}
                fill={active ? 'gray.100' : 'gray.300'}
              />
            : children}
        </ClickableBox>
      </Box>
    </Tooltip>
  )
}
