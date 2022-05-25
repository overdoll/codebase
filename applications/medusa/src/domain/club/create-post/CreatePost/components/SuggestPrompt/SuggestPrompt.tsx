import { ReactNode } from 'react'
import { Icon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, HStack } from '@chakra-ui/react'
import { InfoCircle } from '@//:assets/icons'

interface Props {
  children: ReactNode
}

export default function SuggestPrompt ({ children }: Props): JSX.Element {
  return (
    <SmallBackgroundBox>
      <HStack spacing={4} justify='center' align='center'>
        <Icon icon={InfoCircle} fill='gray.200' w={5} h={5} />
        <Heading color='gray.200' fontSize='sm'>
          {children}
        </Heading>
      </HStack>
    </SmallBackgroundBox>
  )
}
