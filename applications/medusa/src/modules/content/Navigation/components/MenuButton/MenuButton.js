/**
 * @flow
 */
import { Flex, Heading } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  label?: string,
  icon?: () => void,
  active?: boolean,
  onClick?: boolean,
  isDisabled?: boolean,
  color?: string,
  children?: Node
}

export default function MenuButton ({ label, icon, active, onClick, isDisabled, color, children }: Props): Node {
  return (
    <ClickableBox
      onClick={onClick} isDisabled={isDisabled}
      bg={active ? 'gray.700' : 'gray.800'}
    >
      <Flex align='center'>
        {icon &&
          <Flex borderRadius='md' align='center' p={1} mr={3} bg={active ? 'primary.400' : 'gray.500'}>
            <Icon
              icon={icon} w='26px' h='26px' p={1}
              fill={color || (active ? 'gray.00' : 'gray.100')}
            />
          </Flex>}
        {label &&
          <Heading
            color={color || (active ? 'primary.400' : 'gray.100')}
            fontSize='lg'
          >
            {label}
          </Heading>}
        {(!icon && !label) && children}
      </Flex>
    </ClickableBox>
  )
}
