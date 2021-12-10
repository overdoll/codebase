/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'

type Props = {
  icon: ()=> void,
  colorScheme: 'string',
};

export default function PagePanelIcon ({ icon, colorScheme }: Props): Node {
  return (

    <Flex
      p={2} mr={3} h={10} w={10} borderRadius='md' bg={`${colorScheme || 'gray'}.400`} align='center'
      justify='center'
    >
      <Icon icon={icon} fill='gray.00' />
    </Flex>
  )
}
