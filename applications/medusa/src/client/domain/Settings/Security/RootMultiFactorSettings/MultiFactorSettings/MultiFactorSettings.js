/**
 * @flow
 */
import { Badge, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorTotpSettings from './MultiFactorTotpSettings/MultiFactorTotpSettings'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import RecoveryCodesSettings from './RecoveryCodesSettings/RecoveryCodesSettings'
import DisableMultiFactor from './DisableMultiFactor/DisableMultiFactor'

type Props = {
  query: PreloadedQueryInner<MultiFactorSettingsQuery>,
}

const MultiFactorQueryGQL = graphql`
  query MultiFactorSettingsQuery {
    viewer {
      multiFactorSettings {
        multiFactorTotpConfigured
        ...DisableMultiFactorFragment
        ...MultiFactorTotpSettingsFragment
        ...RecoveryCodesSettingsFragment
      }
    }
  }
`

export default function MultiFactorSettings (props: Props): Node {
  const data = usePreloadedQuery<MultiFactorSettingsQuery>(
    MultiFactorQueryGQL,
    props.query
  )

  // Fix an error that happens if a user logs out from the multi factor page
  if (!data?.viewer?.multiFactorSettings) {
    return null
  }

  return (
    <>
      <Stack spacing={3}>
        <MultiFactorTotpSettings data={data?.viewer?.multiFactorSettings} />
        <RecoveryCodesSettings data={data?.viewer?.multiFactorSettings} />
        {data?.viewer?.multiFactorSettings.multiFactorTotpConfigured &&
          <DisableMultiFactor data={data?.viewer?.multiFactorSettings} />}
      </Stack>
    </>
  )
}
