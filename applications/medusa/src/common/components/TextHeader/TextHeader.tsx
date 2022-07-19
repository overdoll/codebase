import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface Props {
  icon: IconType
  title: ReactNode
  children: ReactNode
  colorScheme?: string
}

export default function TextHeader ({
  icon,
  title,
  children,
  colorScheme = 'teal'
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox>
      <Stack spacing={2}>
        <HStack align='center' spacing={2}>
          <Icon icon={icon} w={3} h={3} fill={`${colorScheme}.300`} />
          <Heading fontSize='md' color={`${colorScheme}.300`}>
            {title}
          </Heading>
        </HStack>
        <Heading fontSize='lg' color={`${colorScheme}.100`}>
          {children}
        </Heading>
      </Stack>
    </LargeBackgroundBox>
  )
}
