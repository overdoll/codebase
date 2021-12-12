import { Flex, Heading } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { FunctionComponent } from 'react'

interface Props {
  label?: string
  icon?: FunctionComponent<any>
  active?: boolean
  onClick?: () => void
  isDisabled?: boolean
  color?: string
  children?: JSX.Element
}

export default function MenuButton ({
  label,
  icon,
  active = false,
  onClick,
  isDisabled,
  color,
  children
}: Props): JSX.Element {
  return (
    <ClickableBox
      onClick={onClick}
      isDisabled={isDisabled}
      bg={active ? 'gray.700' : 'gray.800'}
    >
      <Flex align='center'>
        {(icon != null) && (
          <Flex
            borderRadius='md'
            align='center'
            p={1}
            mr={3}
            bg={active ? 'gray.00' : 'gray.500'}
          >
            <Icon
              icon={icon}
              w='26px'
              h='26px'
              p={1}
              fill={(color ?? (active ? 'primary.400' : 'gray.100'))}
            />
          </Flex>
        )}
        {label != null && (
          <Heading
            color={(color ?? (active ? 'gray.00' : 'gray.100'))}
            fontSize='lg'
          >
            {label}
          </Heading>
        )}
        {((icon == null) && label == null) && children}
      </Flex>
    </ClickableBox>
  )
}
