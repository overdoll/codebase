import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpFlow from '../MultiFactorTotpFlow/MultiFactorTotpFlow'
import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<MultiFactorTotpHeaderQuery>
}

const MultiFactorTotpHeaderQueryGQL = graphql`
  query MultiFactorTotpHeaderQuery {
    viewer {
      multiFactorSettings {
        multiFactorTotpConfigured
        recoveryCodesGenerated
      }
    }
  }
`

export default function MultiFactorTotpHeader (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<MultiFactorTotpHeaderQuery>(
    MultiFactorTotpHeaderQueryGQL,
    props.query
  )

  if (queryData?.viewer?.multiFactorSettings == null) return null

  if (!queryData.viewer.multiFactorSettings.recoveryCodesGenerated) {
    return (
      <Flex direction='column' align='center'>
        <Alert mb={3} status='warning'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You must generate a set of recovery codes before you can set up two-factor authentication
            </Trans>
          </AlertDescription>
        </Alert>
        <Link to='/configure/multi-factor/recovery-codes'>
          <Button
            colorScheme='gray'
            size='md'
          >
            <Trans>
              Go to recovery codes
            </Trans>
          </Button>
        </Link>
      </Flex>
    )
  }

  return (
    <>
      {queryData.viewer.multiFactorSettings.multiFactorTotpConfigured &&
        <Flex mb={3} direction='column' align='center'>
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription lineHeight={5} fontSize='sm'>
              <Trans>
                You're about to reconfigure your two-factor authentication device. This will invalidate your current
                two-factor device configuration.
              </Trans>
            </AlertDescription>
          </Alert>
        </Flex>}
      <MultiFactorTotpFlow />
    </>
  )
}
