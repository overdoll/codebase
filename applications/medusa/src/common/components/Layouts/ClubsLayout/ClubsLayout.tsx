import type { ReactNode } from 'react'
import { HStack, Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  children: ReactNode
}

export default function ClubsLayout ({ children }: Props): JSX.Element {
  return (
    <PageWrapper>
      <Stack spacing={4}>
        <HStack justify='space-between' align='center' w='100%' spacing={2}>
          <LinkButton w='100%' href='/clubs/discover'>
            <Trans>
              Discover Clubs
            </Trans>
          </LinkButton>
          <LinkButton w='100%' href='/clubs/liked-posts'>
            <Trans>
              Liked Posts
            </Trans>
          </LinkButton>
        </HStack>
        {children}
      </Stack>
    </PageWrapper>
  )
}
