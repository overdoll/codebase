import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import TotpSubmission from './TotpSubmission/TotpSubmission'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Alert, AlertDescription, AlertIcon, Collapse, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import RecoveryCode from './RecoveryCode/RecoveryCode'
import { Trans } from '@lingui/macro'

interface Props {
  queryRef: MultiFactorFragment$key
}

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorFragment on AuthenticationToken {
    accountStatus {
      multiFactor {
        totp
      }
    }
    ...TotpSubmissionFragment
    ...RecoveryCodeFragment
  }
`

export default function MultiFactor ({ queryRef }: Props): JSX.Element {
  const data = useFragment(MultiFactorFragmentGQL, queryRef)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  return (
    <>
      <Helmet title='multifactor authentication' />
      <PageWrapper>
        <Stack spacing={6}>
          {data.accountStatus?.multiFactor?.totp === true && <TotpSubmission queryRef={data} />}
          <Flex justify='center'>
            <Button
              onClick={onToggle}
              size='md'
              variant='link'
            >
              <Trans>
                I lost access to my device
              </Trans>
            </Button>
          </Flex>
          <Collapse
            animateOpacity
            in={isOpen}
          >
            <Stack spacing={3}>
              <Alert status='info'>
                <AlertIcon />
                <AlertDescription
                  align='center'
                  lineHeight={5}
                  fontSize='sm'
                >
                  <Trans>
                    If you lost access to your two-factor device, you can use one of the recovery codes you downloaded
                    when you set up two-factor authentication.
                  </Trans>
                </AlertDescription>
              </Alert>
              <RecoveryCode queryRef={data} />
            </Stack>
          </Collapse>
        </Stack>
      </PageWrapper>
    </>
  )
}
