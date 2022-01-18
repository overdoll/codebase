import { Flex, Heading } from '@chakra-ui/react'
import Icon from '../../../../PageLayout/Flair/Icon/Icon'
import { ClickableBox, RenderOnDesktop, RenderOnMobile } from '../../../../PageLayout'
import { FunctionComponent, ReactNode } from 'react'

interface Props {
  label?: ReactNode
  icon?: FunctionComponent<any>
  onClick?: () => void
  isDisabled?: boolean
  isActive: boolean
  colorScheme?: string
  color?: string
  children?: ReactNode
}

export default function HorizontalNavigationDropdownMenuButtonBody ({
  children,
  icon,
  colorScheme = 'gray',
  color,
  label,
  isActive,
  isDisabled,
  onClick
}: Props): JSX.Element {
  const colorPalette = colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.400`

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
          w='26px'
          h='26px'
          p={1}
          fill={(color ?? (isActive ? 'gray.00' : 'gray.100'))}
        />
      </Flex>
    )
  }

  return (
    <ClickableBox
      onClick={onClick}
      isDisabled={isDisabled}
      borderRadius='md'
      bg={isActive ? 'gray.900' : 'gray.800'}
      p={2}
      whiteSpace='break-spaces'
    >
      <RenderOnDesktop>
        <Flex
          align='center'
        >
          <IconComponent />
          <TextComponent />
          {(icon == null) && children}
        </Flex>
      </RenderOnDesktop>
      <RenderOnMobile>
        <Flex
          m={1}
          w={24}
          h={24}
          align='center'
          justify='center'
          direction='column'
        >
          <IconComponent />
          <TextComponent />
          {(icon == null) && children}
        </Flex>
      </RenderOnMobile>
    </ClickableBox>
  )
}
