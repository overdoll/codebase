import ClickableBox from '../../PageLayout/Interactables/ClickableBox/ClickableBox'
import { Flex, Text } from '@chakra-ui/react'
import Icon from '../../Icon/Icon'
import { FunctionComponent, ReactNode } from 'react'
import NavLink from '../../../routing/NavLink'

interface Props {
  title: ReactNode
  to: string
  exact?: boolean
  icon: FunctionComponent<any>
  colorScheme?: string
  strict?: boolean
}

export default function VerticalNavigationButton ({
  title,
  icon,
  exact = false,
  strict = false,
  to,
  colorScheme = 'gray'
}: Props): JSX.Element {
  const colorPalette = colorScheme === 'gray' ? `${colorScheme}.100` : `${colorScheme}.400`

  return (
    <NavLink
      exact={exact}
      to={to}
      strict={strict}
    >
      {({ isActive }) => (
        <ClickableBox
          h={10}
          display='inline'
          color={isActive ? colorPalette : 'gray.300'}
          bg={isActive ? 'gray.600' : 'transparent'}
        >
          <Flex
            h='100%'
            align='center'
          >
            {(icon != null) && (
              <Flex
                borderRadius='base'
                align='center'
                p={1}
                mr={3}
                bg={isActive ? colorPalette : 'gray.600'}
              >
                <Icon
                  icon={icon}
                  w={4}
                  h={4}
                  fill={isActive ? 'gray.00' : 'gray.300'}
                />
              </Flex>
            )}
            <Text
              lineHeight='0.5px'
              fontSize='md'
              fontWeight='semibold'
            >
              {title}
            </Text>
          </Flex>
        </ClickableBox>
      )}
    </NavLink>

  )
}
