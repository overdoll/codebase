import { Flex, Heading } from '@chakra-ui/react'
import Icon from '../../../../Icon/Icon'
import { ClickableBox } from '../../../../PageLayout'
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

  return (
    <ClickableBox
      onClick={onClick}
      isDisabled={isDisabled}
      bg={isActive ? 'gray.700' : 'gray.800'}
    >
      <Flex align='center'>
        {(icon != null) && (
          <Flex
            borderRadius='md'
            align='center'
            p={1}
            mr={3}
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
        )}
        {label != null && (
          <Heading
            color={(color ?? (isActive ? colorPalette : 'gray.100'))}
            fontSize='lg'
          >
            {label}
          </Heading>
        )}
        {(icon == null) && children}
      </Flex>
    </ClickableBox>
  )
}