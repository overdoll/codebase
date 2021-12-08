/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Text, Flex } from '@chakra-ui/react'
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

export default function MenuButton (props: Props): Node {
  return (
    <ClickableBox
      onClick={props.onClick} isDisabled={props.isDisabled}
      bg={props.active ? 'gray.700' : 'gray.800'}
      boxShadow={props.active ? 'drag' : 'none'}
    >
      <Flex align='center'>
        {props.icon && <Icon
          mr={2}
          icon={props.icon} w='38px' h='38px' p={2}
          fill={props.color || 'gray.100'}
                       />}
        {props.label && <Text color={props.color || 'gray.100'} fontSize='md'>{props.label}</Text>}
        {(!props.icon && !props.label) && props.children}
      </Flex>
    </ClickableBox>
  )
}
