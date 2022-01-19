import { FunctionComponent } from 'react'
import { Flex } from '@chakra-ui/react'
import { Icon } from '../../../index'

interface Props {
  icon: FunctionComponent<any>
  colorScheme?: string
}

export default function PagePanelIcon ({
  icon,
  colorScheme
}: Props): JSX.Element {
  return (
    <Flex
      p={2}
      h={10}
      w={10}
      borderRadius='md'
      bg={`${colorScheme ?? 'gray'}.400`}
      align='center'
      justify='center'
    >
      <Icon
        icon={icon}
        fill='gray.00'
      />
    </Flex>
  )
}
