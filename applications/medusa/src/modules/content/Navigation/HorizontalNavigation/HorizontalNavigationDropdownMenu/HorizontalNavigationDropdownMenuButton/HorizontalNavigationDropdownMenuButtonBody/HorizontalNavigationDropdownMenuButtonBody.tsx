import { Flex, Heading, Spinner } from '@chakra-ui/react'
import Icon from '../../../../../PageLayout/Flair/Icon/Icon'
import { ClickableBox } from '../../../../../PageLayout'
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
  isPending?: boolean | undefined
}

export default function HorizontalNavigationDropdownMenuButtonBody ({
  children,
  icon,
  colorScheme = 'gray',
  color,
  label,
  isActive,
  isDisabled = false,
  onClick,
  isPending
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
        {isPending === true
          ? <Spinner
              m={1}
              w={4}
              h={4}
              color={fill}
            />
          : <Icon
              icon={icon}
              w={6}
              h={6}
              p={1}
              fill={fill}
            />}
      </Flex>
    )
  }

  return (
    <ClickableBox
      ignoreTransition
      onClick={onClick}
      isDisabled={isDisabled || isPending}
      borderRadius='md'
      bg={isActive ? 'gray.900' : 'gray.800'}
      p={2}
      whiteSpace='break-spaces'
    >
      <Flex
        m={1}
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
  )
}