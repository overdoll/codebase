import { Stack } from '@chakra-ui/react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorTotpSettings from './MultiFactorTotpSettings/MultiFactorTotpSettings'
import RecoveryCodesSettings from './RecoveryCodesSettings/RecoveryCodesSettings'
import DisableMultiFactor from './DisableMultiFactor/DisableMultiFactor'

interface Props {
  query: PreloadedQuery<MultiFactorSettingsQuery>
}

const MultiFactorQueryGQL = graphql`
  query MultiFactorSettingsQuery {
    viewer {
      multiFactorTotpConfigured
      ...DisableMultiFactorFragment
      ...MultiFactorTotpSettingsFragment
      ...RecoveryCodesSettingsFragment
    }
  }
`

export default function MultiFactorSettings (props: Props): JSX.Element | null {
  const data = usePreloadedQuery<MultiFactorSettingsQuery>(
    MultiFactorQueryGQL,
    props.query
  )

  // Fix an error that happens if a user logs out from the multi factor page
  if (data?.viewer == null) {
    return null
  }

  return (
    <Stack spacing={2}>
      <RecoveryCodesSettings data={data?.viewer} />
      <MultiFactorTotpSettings data={data?.viewer} />
      {data?.viewer?.multiFactorTotpConfigured &&
        <DisableMultiFactor data={data?.viewer} />}
    </Stack>
  )
}
