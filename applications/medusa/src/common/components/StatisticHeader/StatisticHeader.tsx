import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface Props {
  icon: IconType
  title: ReactNode
  children: ReactNode
}

export default function StatisticHeader ({
  icon,
  title,
  children
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox>
      <Stack spacing={4}>
        <HStack align='center' spacing={2}>
          <Icon icon={icon} w={3} h={3} fill='gray.200' />
          <Heading fontSize='md' color='gray.200'>
            {title}
          </Heading>
        </HStack>
        <Heading fontSize='4xl' color='gray.00'>
          {children}
        </Heading>
      </Stack>
    </LargeBackgroundBox>
  )
}
