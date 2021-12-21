import NavLink from '../../../../routing/NavLink'
import { FunctionComponent, ReactNode } from 'react'
import { ClickableBox } from '../../../PageLayout'
import { Flex, Heading } from '@chakra-ui/react'
import Icon from '../../../Icon/Icon'

interface Props {
  label?: ReactNode
  icon?: FunctionComponent<any>
  to?: string
  onClick?: () => void
  isDisabled?: boolean
  color?: string
  children?: ReactNode
}

export default function HorizontalNavigationDropdownMenuButton ({
  label,
  icon,
  onClick,
  isDisabled,
  color,
  children,
  to = ''
}: Props): JSX.Element {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <ClickableBox
          onClick={onClick}
          isDisabled={isDisabled}
          bg={isActive ? 'gray.700' : 'gray.800'}
        >
          <Flex align='center'>
            {(icon != null) && (
              <Flex
                borderRadius='md'
                align='center'
                p={1}
                mr={3}
                bg={isActive ? 'gray.00' : 'gray.500'}
              >
                <Icon
                  icon={icon}
                  w='26px'
                  h='26px'
                  p={1}
                  fill={(color ?? (isActive ? 'primary.400' : 'gray.100'))}
                />
              </Flex>
            )}
            {label != null && (
              <Heading
                color={(color ?? (isActive ? 'gray.00' : 'gray.100'))}
                fontSize='lg'
              >
                {label}
              </Heading>
            )}
            {(icon == null) && children}
          </Flex>
        </ClickableBox>
      )}
    </NavLink>
  )
}
