import { IconType } from '@//:types/components'
import { Heading, HStack } from '@chakra-ui/react'
import Icon from '../../../BuildingBlocks/Icon/Icon'
import { ReactNode } from 'react'

interface Props {
  icon: IconType
  title: ReactNode
}

export default function PageHeader (props: Props): JSX.Element {
  const {
    icon,
    title
  } = props

  return (
    <HStack spacing={2} align='center'>
      <Icon fill='gray.300' icon={icon} w={5} h={5} />
      <Heading color='gray.300' fontSize='xl'>
        {title}
      </Heading>
    </HStack>
  )
}
