import type { ReactNode } from 'react'
import { Stack } from '@chakra-ui/react'
import { LargeBackgroundBox, PageWrapper } from '@//:modules/content/PageLayout'
import ClubsLayoutButtons from './ClubsLayoutButtons/ClubsLayoutButtons'

interface Props {
  children: ReactNode
}

export default function ClubsLayout ({ children }: Props): JSX.Element {
  return (
    <PageWrapper>
      <Stack spacing={4}>
        <LargeBackgroundBox p={2}>
          <ClubsLayoutButtons />
        </LargeBackgroundBox>
        {children}
      </Stack>
    </PageWrapper>
  )
}
