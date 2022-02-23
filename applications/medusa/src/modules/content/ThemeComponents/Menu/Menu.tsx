import {
  Box,
  HStack,
  IconButton,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem as ChakraMenuItem,
  MenuList,
  Spinner,
  Text
} from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { NavigationMenuHorizontal } from '@//:assets/icons/navigation'
import { Icon } from '../../PageLayout'
import { FunctionComponent, ReactNode } from 'react'
import { Link } from '../../../routing'
import { useLingui } from '@lingui/react'

interface MenuProps {
  children: ReactNode
}

interface MenuItemProps {
  text: ReactNode
  colorScheme?: string | undefined
  isLoading?: boolean | undefined
  icon: FunctionComponent<any>
  onClick?: (() => void) | undefined
}

interface MenuLinkItemProps extends MenuItemProps {
  to: string
}

export function Menu ({
  children
}: MenuProps): JSX.Element {
  const { i18n } = useLingui()

  return (
    <Box>
      <ChakraMenu autoSelect={false}>
        <MenuButton
          bg='transparent'
          borderRadius='xl'
          h={10}
          w={10}
          aria-label={i18n._(t`Open Menu`)}
          as={IconButton}
          icon={
            <Icon
              p={2}
              icon={NavigationMenuHorizontal}
              w={10}
              h={10}
              fill='gray.200'
            />
          }
        />
        <MenuList minW='300px' boxShadow='outline'>
          {children}
        </MenuList>
      </ChakraMenu>
    </Box>
  )
}

export function MenuItem ({
  text,
  colorScheme,
  icon,
  isLoading,
  onClick
}: MenuItemProps): JSX.Element {
  const color = colorScheme != null ? `${colorScheme}.400` : 'gray.100'

  const IconComponent = (): JSX.Element => {
    if (isLoading === true) {
      return (
        <Spinner
          w={6}
          h={6}
          color={color}
        />
      )
    }

    return (
      <Icon
        pointerEvents='none'
        icon={icon}
        fill={color}
        w={6}
        h={6}
      />
    )
  }

  return (
    <ChakraMenuItem onClick={onClick} isDisabled={isLoading}>
      <HStack spacing={3}>
        <IconComponent />
        <Text
          color={color}
          fontSize='xl'
        >
          {text}
        </Text>
      </HStack>
    </ChakraMenuItem>
  )
}

export function MenuLinkItem ({
  to,
  ...rest
}: MenuLinkItemProps): JSX.Element {
  return (
    <Link to={to}>
      {({ isPending }) => (
        <MenuItem isLoading={isPending} {...rest} />
      )}
    </Link>
  )
}
