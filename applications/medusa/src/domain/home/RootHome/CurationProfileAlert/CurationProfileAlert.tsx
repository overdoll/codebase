import { useFragment } from 'react-relay/hooks'
import type { CurationProfileAlertFragment$key } from '@//:artifacts/CurationProfileAlertFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Alert, AlertCloseButton, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { useFlash } from '@//:modules/flash'
import { useEffect } from 'react'

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
      <Flex
        w='100%'
        align='center'
        justify='space-between'
      >
        <HStack spacing={0} align='center'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              Set up your curation profile so we can show you personalized content
            </Trans>
          </AlertDescription>
        </HStack>
        <LinkButton
          href='/settings/preferences/curation-profile'
          size='sm'
          colorScheme='teal'
          variant='solid'
        >
          <Trans>
            Setup
          </Trans>
        </LinkButton>
        <AlertCloseButton
          position='absolute'
          size='sm'
          right={2}
          top={2}
          onClick={() => flush('new.account')}
        />
      </Flex>
    </Alert>
  )
}
