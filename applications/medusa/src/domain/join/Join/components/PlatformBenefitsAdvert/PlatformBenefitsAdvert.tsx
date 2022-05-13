import { Center, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import AdvertBoxWrapper from './AdvertBoxWrapper/AdvertBoxWrapper'
import BenefitsTransition from './BenefitsTransition/BenefitsTransition'

interface Props {
  children: ReactNode
}

export default function PlatformBenefitsAdvert ({ children }: Props): JSX.Element {
  return (
    <Stack
      direction={{
        base: 'column-reverse',
        md: 'row'
      }}
      spacing={4}
      justify='center'
      align='center'
    >
      <Center>
        <BenefitsTransition />
      </Center>
      <Center>
        <AdvertBoxWrapper>
          {children}
        </AdvertBoxWrapper>
      </Center>
    </Stack>
  )
}
