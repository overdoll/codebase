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
    <LargeBackgroundBox p={3} borderLeftWidth={3} borderLeftColor={`${colorScheme}.300`}>
      <HStack align='center' justify='space-between'>
        <HStack align='center' spacing={2}>
          <Icon
            icon={icon}
            w={4}
            h={4}
            fill='gray.00'
          />
          <Heading lineHeight={1} color='gray.00' fontSize='md'>
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
