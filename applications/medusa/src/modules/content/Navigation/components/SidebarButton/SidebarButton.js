/**
 * @flow
 */
import NavLink from '@//:modules/routing/NavLink'
import Button from '@//:modules/form/Button'
import ClickableBox from '@//:modules/content/PageLayout/Interactables/ClickableBox/ClickableBox'
import { Flex, Heading, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'

type Props = {
  active: boolean,
  title: string,
  icon?: () => void,
}

export default function SidebarButton ({ active, title, icon }: Props): Node {
  return (
    <ClickableBox
      h={9}
      display='inline'
      color={active ? 'primary.400' : 'gray.300'}
      bg={active ? 'gray.600' : 'transparent'}
    >
      <Flex align='center'>
        {icon &&
          <Icon
            mr={3}
            icon={icon} w='20px' h='20px'
            fill={active ? 'primary.400' : 'gray.300'}
          />}
        <Heading fontSize='md' fontWeight='semibold'>{title}</Heading>
      </Flex>
    </ClickableBox>
  )
}
