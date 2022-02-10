import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpFlow from '../MultiFactorTotpFlow/MultiFactorTotpFlow'
import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: PreloadedQuery<MultiFactorTotpHeaderQuery>
}

const MultiFactorTotpHeaderQueryGQL = graphql`
  query MultiFactorTotpHeaderQuery {
    viewer @required(action: THROW) {
      multiFactorTotpConfigured
      recoveryCodesGenerated
    }
  }
`

export default function MultiFactorTotpHeader (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<MultiFactorTotpHeaderQuery>(
    MultiFactorTotpHeaderQueryGQL,
    props.query
  )

  if (queryData?.viewer == null) return null

  if (!queryData.viewer?.recoveryCodesGenerated) {
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
        <LinkButton
          to='/configure/multi-factor/recovery-codes'
          colorScheme='gray'
          size='md'
        >
          <Trans>
            Go to recovery codes
          </Trans>
        </LinkButton>
      </Flex>
    )
  }

  return (
    <>
      {queryData?.viewer.multiFactorTotpConfigured &&
        <Flex mb={3} direction='column' align='center'>
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription lineHeight={5} fontSize='sm'>
              <Trans>
                You have already set up your two-factor authentication device. Activating the code again will invalidate
                your current two-factor device configuration.
              </Trans>
            </AlertDescription>
          </Alert>
        </Flex>}
      <MultiFactorTotpFlow />
    </>
  )
}
