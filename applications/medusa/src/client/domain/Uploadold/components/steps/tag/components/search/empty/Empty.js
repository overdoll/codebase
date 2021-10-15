/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button'
import CleaningBroom from '@streamlinehq/streamlinehq/img/streamline-regular/wayfinding/cleaning/cleaning-broom.svg'

type Props = {
  title: string,
  button?: string,
  onClick?: () => void,
};

export default function Empty ({ title, button, onClick }: Props): Node {
  return (
    <Flex direction='column' align='center' justify='center' mt={20}>
      <Icon h={100} w={100} icon={CleaningBroom} color='gray.100' mb={8} />
      <Heading mb={8} color='gray.100' size='lg'>
        {title}
      </Heading>
      {button &&
        <Button size='lg' onClick={onClick}>
          {button}
        </Button>}
    </Flex>
  )
}
