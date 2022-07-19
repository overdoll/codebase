import { FunctionComponent } from 'react'
import { Flex } from '@chakra-ui/react'
import { Icon } from '../../index'
import { IconType } from '@//:types/components'

interface Props {
  icon: IconType
  colorScheme: string
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
      bg={`${colorScheme}.300`}
      align='center'
      justify='center'
    >
      <Icon
        icon={icon}
        fill={`${colorScheme}.100`}
      />
    </Flex>
  )
}
