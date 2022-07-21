import { ButtonProps, Heading, HStack } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import { ShareExternalLink } from '@//:assets/icons/interface'
import { ClickableBox, Icon } from '../../../../PageLayout'
import { IconType } from '@//:types/components'

interface Props extends Omit<ButtonProps, 'title'> {
  title: ReactNode
  icon?: IconType | undefined
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
  isActive: boolean
}

const VerticalNavigationButtonBody = forwardRef<any, Props>(({
  title,
  icon,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false,
  isActive,
  onClick,
  ...rest
}: Props, forwardedRef): JSX.Element => {
  const IconComponent = (): JSX.Element => {
    const color = isActive
      ? 'gray.00'
      : buttonType === 'primary'
        ? `${colorScheme}.900`
        : 'gray.200'

    if (icon == null) {
      return <></>
    }

    return (
      <Icon
        icon={icon}
        w={4}
        h={4}
        fill={color}
      />
    )
  }

  return (
    <ClickableBox
      p={2}
      ref={forwardedRef}
      h={10}
      borderRadius='md'
      _hover={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.300` : 'initial' }}
      _active={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.300` : 'transparent' }}
      bg={isActive
        ? 'gray.900'
        : buttonType === 'primary'
          ? `${colorScheme}.300`
          : 'transparent'}
      onClick={onClick}
      {...rest}
    >
      <HStack
        w='100%'
        h='100%'
        align='center'
        justify='space-between'
        spacing={4}
        px={1}
      >
        <HStack spacing={3} align='center'>
          <IconComponent />
          <Heading
            color={isActive
              ? 'gray.00'
              : buttonType === 'primary'
                ? `${colorScheme}.900`
                : 'gray.200'}
            fontSize='md'
            lineHeight={1}
          >
            {title}
          </Heading>
        </HStack>
        {isExternal && (
          <Icon
            icon={ShareExternalLink}
            w={4}
            h={4}
            fill={isActive ? 'gray.00' : 'gray.200'}
          />
        )}
      </HStack>
    </ClickableBox>
  )
})

export default VerticalNavigationButtonBody
