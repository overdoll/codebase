import React from 'react'
import { MobileContainer } from '@//:modules/content/PageLayout'
import RootSearchRichObject from '@//:common/rich-objects/RootSearchRichObject/RootSearchRichObject'
import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '@//:modules/content/Placeholder/NotFound/NotFoundFooter/NotFoundFooter'

export default function EmptySearchSeries (): JSX.Element {
  return (
    <>
      <RootSearchRichObject />
      <MobileContainer>
        <Center>
          <Stack spacing={8}>
            <Heading fontSize='2xl' color='gray.00'>
              <Trans>
                This series was not found
              </Trans>
            </Heading>
            <NotFoundFooter />
          </Stack>
        </Center>
      </MobileContainer>
    </>
  )
}
