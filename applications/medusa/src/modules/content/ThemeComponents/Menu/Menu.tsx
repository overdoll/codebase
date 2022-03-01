import {
  Box,
  ButtonProps,
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

interface MenuProps extends ButtonProps {
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
  children,
  ...rest
}: MenuProps): JSX.Element {
  const { i18n } = useLingui()

  return (
    <Box>
      <ChakraMenu autoSelect={false}>
        <MenuButton
          borderRadius='xl'
          size='lg'
          aria-label={i18n._(t`Open Menu`)}
          as={IconButton}
          {...rest}
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
        <MenuList minW='230px' boxShadow='outline'>
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
          w={4}
          h={4}
          color={color}
        />
      )
    }

    return (
      <Icon
        pointerEvents='none'
        icon={icon}
        fill={color}
        w={4}
        h={4}
      />
    )
  }

  return (
    <ChakraMenuItem onClick={onClick} isDisabled={isLoading}>
      <HStack spacing={3}>
        <IconComponent />
        <Text
          color={color}
          fontSize='lg'
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
