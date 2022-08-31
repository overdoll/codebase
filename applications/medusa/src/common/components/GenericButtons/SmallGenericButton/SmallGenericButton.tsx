import { HrefType, IconType } from '@//:types/components'
import { ReactNode } from 'react'
import Button from '@//:modules/form/Button/Button'
import { Icon } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import LinkIconButton from '@//:modules/content/ThemeComponents/LinkIconButton/LinkIconButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  icon: IconType
  children: ReactNode
  isIcon?: boolean
  href?: HrefType
}

export default function SmallGenericButton ({
  icon,
  children,
  isIcon = false,
  href,
  colorScheme,
  ...rest
}: Props): JSX.Element {
  const IconItem = (
    <Icon
      icon={icon}
      fill={(colorScheme !== 'gray' && colorScheme != null) ? 'gray.00' : 'gray.100'}
      w={4}
      h={4}
    />
  )

  if (isIcon) {
    const ICON_BUTTON_PROPS = {
      icon: IconItem,
      size: 'sm',
      variant: 'solid',
      'aria-label': children as string,
      colorScheme
    }

    if (href != null) {
      return <LinkIconButton href={href} {...ICON_BUTTON_PROPS} {...rest} />
    }

    return <IconButton {...ICON_BUTTON_PROPS} {...rest} />
  }

  const BUTTON_PROPS = {
    size: 'sm',
    variant: 'solid',
    leftIcon: IconItem,
    children: children,
    colorScheme
  }

  if (href != null) {
    return <LinkButton href={href} {...BUTTON_PROPS} {...rest} />
  }

  return <Button {...BUTTON_PROPS} {...rest} />
}
