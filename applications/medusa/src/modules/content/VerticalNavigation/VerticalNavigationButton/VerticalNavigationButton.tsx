import ClickableBox from '../../Interactables/ClickableBox/ClickableBox'
import { Flex, Text } from '@chakra-ui/react'
import Icon from '../../PageLayout/Flair/Icon/Icon'
import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../routing/NavLink'
import { ShareExternalLink } from '@//:assets/icons/interface'

interface Props {
  title: ReactNode
  to: string
  exact?: boolean
  icon: FunctionComponent<any>
  colorScheme?: string
  strict?: boolean
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
  exact = false,
  strict = false,
  to,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false
}: Props): JSX.Element {
  return (
    <NavLink
      exact={exact}
      to={to}
      strict={strict}
    >
      {({ isActive }) => (
        <ClickableBox
          h={buttonType === 'primary' ? 12 : 10}
          display='inline'
          borderRadius='md'
          _hover={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.400` : 'initial' }}
          _active={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.400` : 'transparent' }}
          bg={isActive
            ? 'gray.900'
            : buttonType === 'primary'
              ? `${colorScheme}.400`
              : 'transparent'}
        >
          <Flex
            h='100%'
            align='center'
            justify='space-between'
          >
            <Flex align='center'>
              {(icon != null) && (
                <Flex
                  borderRadius='base'
                  align='center'
                  p={1}
                  mr={2}
                  ml={1}
                >
                  <Icon
                    icon={icon}
                    w={4}
                    h={4}
                    fill={isActive
                      ? 'gray.00'
                      : buttonType === 'primary'
                        ? `${colorScheme}.900`
                        : 'gray.200'}
                  />
                </Flex>
              )}
              <Text
                color={isActive
                  ? 'gray.00'
                  : buttonType === 'primary'
                    ? `${colorScheme}.900`
                    : 'gray.200'}
                fontSize='md'
                letterSpacing='wider'
                fontWeight='semibold'
                mr={1}
              >
                {title}
              </Text>
            </Flex>
            {isExternal && (
              <Flex
                align='center'
                p={1}
                mr={1}
              >
                <Icon
                  icon={ShareExternalLink}
                  w={4}
                  h={4}
                  fill={isActive ? 'gray.00' : 'gray.200'}
                />
              </Flex>
            )}
          </Flex>
        </ClickableBox>
      )}
    </NavLink>
  )
}
