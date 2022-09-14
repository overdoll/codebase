import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Trans } from '@lingui/macro'
import RootPublicPostRichObject from '@//:common/rich-objects/slug/RootPublicPostRichObject/RootPublicPostRichObject'
import { MobileContainer, PostPlaceholder } from '@//:modules/content/PageLayout'
import NotFoundFooter from '@//:modules/content/Placeholder/NotFound/NotFoundFooter/NotFoundFooter'

export default function EmptyPublicPost (): JSX.Element {
  return (
    <>
      <RootPublicPostRichObject />
      <MobileContainer>
        <PostPlaceholder>
          <Stack spacing={8}>
            <Heading fontSize='2xl' color='gray.00'>
              <Trans>
                This post was not found
              </Trans>
            </Heading>
            <NotFoundFooter />
          </Stack>
        </PostPlaceholder>
      </MobileContainer>
    </>
  )
}
