import { Heading, HStack, Spinner } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import { ShareExternalLink } from '@//:assets/icons/interface'
import { ClickableBox, Icon } from '../../../../PageLayout'

interface Props {
  title: ReactNode
  icon?: FunctionComponent<any> | undefined
  colorScheme?: string
  buttonType?: 'primary' | 'secondary'
  isExternal?: boolean
  isActive: boolean
  isPending: boolean
}

export default function VerticalNavigationButtonBody ({
  title,
  icon,
  colorScheme = 'gray',
  buttonType = 'secondary',
  isExternal = false,
  isActive,
  isPending
}: Props): JSX.Element {
  const IconComponent = (): JSX.Element => {
    const color = isActive
      ? 'gray.00'
      : buttonType === 'primary'
        ? `${colorScheme}.900`
        : 'gray.200'

    if (isPending) {
      return (
        <Spinner
          w={4}
          h={4}
          color={color}
        />
      )
    }

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
      h={10}
      borderRadius='md'
      _hover={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.400` : 'initial' }}
      _active={{ bg: buttonType === 'primary' ? isActive ? 'gray.900' : `${colorScheme}.400` : 'transparent' }}
      bg={isActive
        ? 'gray.900'
        : buttonType === 'primary'
          ? `${colorScheme}.400`
          : 'transparent'}
    >
      <HStack
        w='100%'
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
}
