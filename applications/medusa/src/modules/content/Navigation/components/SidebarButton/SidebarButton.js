/**
 * @flow
 */
import ClickableBox from '@//:modules/content/PageLayout/Interactables/ClickableBox/ClickableBox';
import { Flex, Heading } from '@chakra-ui/react';
import Icon from '@//:modules/content/Icon/Icon';

type Props = {
  active: boolean,
  title: string,
  icon?: () => void,
}

export default function SidebarButton ({ active, title, icon }: Props): Node {
  return (
    <ClickableBox
      h={10}
      display='inline'
      color={active ? 'primary.400' : 'gray.300'}
      bg={active ? 'gray.600' : 'transparent'}
    >
      <Flex h='100%' align='center'>
        {icon &&
          <Flex borderRadius='base' align='center' p={1} mr={3} bg={active ? 'primary.400' : 'gray.600'}>
            <Icon
              icon={icon} w={4} h={4}
              fill={active ? 'gray.00' : 'gray.300'}
            />
          </Flex>}
        <Heading lineHeight='0.5px' fontSize='md'>{title}</Heading>
      </Flex>
    </ClickableBox>
  )
}
