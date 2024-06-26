import { ButtonProps, Flex, Heading } from '@chakra-ui/react'
import Icon from '../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { ClickableBox } from '../../../../../PageLayout'
import { forwardRef, ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface Props extends Omit<ButtonProps, 'label'> {
  label?: ReactNode
  icon?: IconType
  isActive: boolean
  color?: string
  children?: ReactNode
}

const HorizontalNavigationDropdownMenuButtonBody = forwardRef(({
  children,
  icon,
  colorScheme = 'gray',
  color,
  label,
  isActive,
  isDisabled = false,
  onClick,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const colorPalette = colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.300`

  const TextComponent = (): JSX.Element => {
    if (label == null) return <></>
    return (
      <Heading
        color={(color ?? (isActive ? colorPalette : 'gray.100'))}
        fontSize='lg'
        textAlign={{
          md: 'left',
          base: 'center'
        }}
      >
        {label}
      </Heading>
    )
  }

  const IconComponent = (): JSX.Element => {
    if (icon == null) return <></>

    const fill = (color ?? (isActive ? 'gray.00' : 'gray.100'))

    return (
      <Flex
        borderRadius='md'
        align='center'
        p={1}
        mr={{
          base: 0,
          md: 3
        }}
        mb={{
          base: 2,
          md: 0
        }}
        bg={isActive ? colorPalette : 'gray.500'}
      >
        <Icon
          icon={icon}
          w={6}
          h={6}
          p={1}
          fill={fill}
        />
      </Flex>
    )
  }

  return (
    <Flex h='100%' w='100%'>
      <ClickableBox
        ref={forwardRef}
        ignoreTransition
        onClick={onClick}
        isDisabled={isDisabled}
        borderRadius='md'
        bg={isActive ? 'gray.900' : 'gray.800'}
        p={2}
        whiteSpace='break-spaces'
        {...rest}
      >
        <Flex
          p={1}
          w={{
            base: 24,
            md: '100%'
          }}
          h={{
            base: 24,
            md: '100%'
          }}
          align='center'
          justify={{
            base: 'center',
            md: 'flex-start'
          }}
          direction={{
            base: 'column',
            md: 'row'
          }}
        >
          <IconComponent />
          <TextComponent />
          {(icon == null) && children}
        </Flex>
      </ClickableBox>
    </Flex>
  )
})

export default HorizontalNavigationDropdownMenuButtonBody
