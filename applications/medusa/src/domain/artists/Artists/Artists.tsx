import { PageWrapper } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import { Trans } from '@lingui/macro'
import { Heading, Stack } from '@chakra-ui/react'
import { OverdollLogo } from '@//:assets/logos'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import InviteOnlyRichObject
  from '@//:common/rich-objects/clubs/invite-only/InviteOnlyRichObject/InviteOnlyRichObject'

const Artists: PageProps<{}> = () => {
  const HEADER_PROPS = {
    color: 'primary.400',
    fontSize: '4xl'
  }

  const TEXT_PROPS = {
    color: 'gray.00',
    fontSize: 'md'
  }

  const HIGHLIGHT_PROPS = {
    color: 'primary.100'
  }

  return (
    <>
      <InviteOnlyRichObject />
      <PageWrapper>
        <Stack spacing={16}>
          <Icon
            icon={OverdollLogo}
            w={40}
            h={40}
            fill='primary.400'
          />
          <Stack spacing={1}>
            <Heading {...HEADER_PROPS}>
              <Trans>
                overdoll is invite-only
              </Trans>
            </Heading>
          </Stack>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default Artists
