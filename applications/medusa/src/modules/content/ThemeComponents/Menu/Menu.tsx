import {
  Box,
  ButtonProps,
  forwardRef,
  HStack,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem as ChakraMenuItem,
  MenuList,
  Portal,
  Spinner,
  Text
} from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { NavigationMenuHorizontal } from '@//:assets/icons/navigation'
import { Icon } from '../../PageLayout'
import { ReactNode } from 'react'
import { Link } from '../../../routing'
import { useLingui } from '@lingui/react'
import { UrlObject } from 'url'
import { IconType } from '@//:types/components'
import IconButton from '../../../form/IconButton/IconButton'

interface MenuProps extends ButtonProps {
  children: ReactNode
}

interface MenuItemProps extends ButtonProps {
  text: ReactNode
  colorScheme?: string | undefined
  icon: IconType
}

interface MenuLinkItemProps extends MenuItemProps {
  href: string | UrlObject
}

const ICON_SIZES = {
  xs: 3,
  sm: 6,
  md: 7,
  lg: 8,
  xl: 9
}

const Menu = forwardRef<MenuProps, any>(({
  children,
  size = 'sm',
  ...rest
}: MenuProps, forwardRef): JSX.Element => {
  const { i18n } = useLingui()

  return (
    <Box>
      <ChakraMenu autoSelect={false}>
        <MenuButton
          borderRadius='xl'
          aria-label={i18n._(t`Open Menu`)}
          size={size}
          icon={
            <Icon
              icon={NavigationMenuHorizontal}
              w={ICON_SIZES[size as string]}
              h={ICON_SIZES[size as string]}
              fill='gray.200'
            />
          }
          as={IconButton}
          ref={forwardRef}
          {...rest}
        />
        <Portal>
          <MenuList minW='230px' boxShadow='outline'>
            {children}
          </MenuList>
        </Portal>
      </ChakraMenu>
    </Box>
  )
})

const MenuItem = forwardRef<MenuItemProps, any>(({
  text,
  colorScheme,
  icon,
  isLoading,
  ...rest
}: MenuItemProps, forwardRef): JSX.Element => {
  const color = colorScheme != null ? `${colorScheme}.300` : 'gray.100'

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
    <ChakraMenuItem ref={forwardRef} isDisabled={isLoading} {...rest}>
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
})

const MenuLinkItem = ({
  href,
  ...rest
}: MenuLinkItemProps): JSX.Element => {
  return (
    <Link passHref href={href}>
      <Box w='100%' as='a'>
        <MenuItem {...rest} />
      </Box>
    </Link>
  )
}

export { MenuItem, MenuLinkItem, Menu }
