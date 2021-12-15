import ClickableBox from '../../PageLayout/Interactables/ClickableBox/ClickableBox'
import { Flex, Heading } from '@chakra-ui/react'
import Icon from '../../Icon/Icon'
import { FunctionComponent } from 'react'
import NavLink from '../../../routing/NavLink'

interface Props {
  title: string
  to: string
  exact?: boolean
  icon: FunctionComponent<any>
}

export default function VerticalNavigationButton ({
  title,
  icon,
  exact = false,
  to
}: Props): JSX.Element {
  return (
    <NavLink
      exact={exact}
      to={to}
    >
      {({ isActive }) => (
        <ClickableBox
          h={10}
          display='inline'
          color={isActive ? 'primary.400' : 'gray.300'}
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
                bg={isActive ? 'primary.400' : 'gray.600'}
              >
                <Icon
                  icon={icon}
                  w={4}
                  h={4}
                  fill={isActive ? 'gray.00' : 'gray.300'}
                />
              </Flex>
            )}
            <Heading
              lineHeight='0.5px'
              fontSize='md'
            >
              {title}
            </Heading>
          </Flex>
        </ClickableBox>
      )}
    </NavLink>

  )
}
