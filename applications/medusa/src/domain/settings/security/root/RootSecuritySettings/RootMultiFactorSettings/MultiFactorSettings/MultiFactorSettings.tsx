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

const Query = graphql`
  query MultiFactorSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      multiFactorTotpConfigured
      ...DisableMultiFactorFragment
      ...MultiFactorTotpSettingsFragment
      ...RecoveryCodesSettingsFragment
    }
  }
`

export default function MultiFactorSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<MultiFactorSettingsQuery>(
    Query,
    props.query
  )

  return (
    <Stack spacing={2}>
      <RecoveryCodesSettings data={data.viewer} />
      <MultiFactorTotpSettings data={data.viewer} />
      {data.viewer?.multiFactorTotpConfigured &&
        <DisableMultiFactor data={data.viewer} />}
    </Stack>
  )
}
