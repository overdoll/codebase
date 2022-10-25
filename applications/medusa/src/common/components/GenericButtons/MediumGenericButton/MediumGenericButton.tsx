import { HrefType, IconType } from '@//:types/components'
import { ReactNode } from 'react'
import Button from '@//:modules/form/Button/Button'
import { Icon } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import LinkIconButton from '@//:modules/content/ThemeComponents/LinkIconButton/LinkIconButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { ButtonProps, forwardRef } from '@chakra-ui/react'

interface Props extends ButtonProps {
  icon?: IconType
  children: ReactNode
  isIcon?: boolean
  href?: HrefType
}

const MediumGenericButton = forwardRef<Props, any>(({
  icon,
  children,
  isIcon = false,
  href,
  colorScheme,
  leftIcon,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const IconItem = icon != null
    ? (
      <Icon
        icon={icon}
        fill={(colorScheme !== 'gray' && colorScheme != null) ? `${colorScheme}.900` : 'gray.100'}
        h={4}
      />
      )
    : null

  const DEFAULT_BUTTON_PROPS = {
    size: 'md',
    variant: 'solid',
    borderRadius: 'xl',
    colorScheme
  }

  if (isIcon) {
    const ICON_BUTTON_PROPS = {
      ...(IconItem != null && { icon: IconItem }),
      'aria-label': children as string,
      ...DEFAULT_BUTTON_PROPS
    }

    if (href != null) {
      return <LinkIconButton href={href} {...ICON_BUTTON_PROPS} ref={forwardRef} {...rest} />
    }

    return <IconButton {...ICON_BUTTON_PROPS} ref={forwardRef} {...rest} />
  }

  const BUTTON_PROPS = {
    ...(IconItem != null && { rightIcon: IconItem }),
    children: children,
    ...DEFAULT_BUTTON_PROPS
  }

  if (href != null) {
    return <LinkButton href={href} {...BUTTON_PROPS} ref={forwardRef} {...rest} />
  }

  return <Button {...BUTTON_PROPS} ref={forwardRef} {...rest} />
})

export default MediumGenericButton
