import { useFragment } from 'react-relay/hooks'
import type { CurationProfileAlertFragment$key } from '@//:artifacts/CurationProfileAlertFragment.graphql'
import { graphql } from 'react-relay'
import { HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Alert, AlertCloseButton, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { useFlash } from '@//:modules/flash'
import { useEffect } from 'react'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  query: CurationProfileAlertFragment$key | null
}

const Fragment = graphql`
  fragment CurationProfileAlertFragment on Account {
    __typename
    curationProfile {
      completed
    }
  }
`

export default function CurationProfileAlert ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    read,
    flush
  } = useFlash()

  const hasNewAccount = read('new.account')

  const trackClick = (): void => {
    trackFathomEvent('T0ZPPEWQ', 1)
  }

  useEffect(() => {
    if (data?.curationProfile?.completed === true && hasNewAccount != null) {
      flush('new.account')
    }
  }, [data?.curationProfile?.completed, hasNewAccount])

  if (data == null) {
    return <></>
  }

  if (hasNewAccount == null) {
    return <></>
  }

  return (
    <Alert
      status='info'
      mb={2}
    >
      <Stack w='100%' justify='center' spacing={3}>
        <HStack spacing={1}>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              Set up your curation profile so we can show you personalized content
            </Trans>
          </AlertDescription>
        </HStack>
        <LinkButton
          onClick={trackClick}
          href='/settings/preferences/curation-profile'
          size='sm'
          width='100%'
          colorScheme='teal'
          variant='solid'
        >
          <Trans>
            Setup
          </Trans>
        </LinkButton>
      </Stack>
      <AlertCloseButton
        position='absolute'
        size='sm'
        right={2}
        top={2}
        onClick={() => flush('new.account')}
      />
    </Alert>
  )
}
