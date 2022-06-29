import { Heading, HStack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { EditView } from '@//:assets/icons'
import { ColorScheme, IconType } from '@//:types/components'
import { ReactNode } from 'react'

interface Props {
  icon: IconType
  colorScheme: ColorScheme
  text: ReactNode
}

export default function InspectableAlert ({
  icon,
  colorScheme,
  text
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox borderLeftWidth={3} borderLeftColor={`${colorScheme}.300`}>
      <HStack align='center' justify='space-between'>
        <HStack align='center' spacing={3}>
          <Icon
            icon={icon}
            w={5}
            h={5}
            fill='gray.00'
          />
          <Heading color='gray.00' fontSize='lg'>
            {text}
          </Heading>
        </HStack>
        <Icon
          icon={EditView}
          w={5}
          h={5}
          fill='gray.200'
        />
      </HStack>
    </LargeBackgroundBox>
  )
}
