/**
 * @flow
 */
import { Badge, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorTotpSettings from './MultiFactorTotpSettings/MultiFactorTotpSettings'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import RecoveryCodesSettings from './RecoveryCodesSettings/RecoveryCodesSettings'
import Link from '@//:modules/routing/Link'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import DisableMultiFactor from './DisableMultiFactor/DisableMultiFactor'

type Props = {
  query: PreloadedQueryInner<MultiFactorSettingsQuery>,
}

const MultiFactorQueryGQL = graphql`
  query MultiFactorSettingsQuery {
    viewer {
      multiFactorSettings {
        multiFactorEnabled
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

  const [t] = useTranslation('settings')

  return (
    <>
      <Stack spacing={3}>
        <MultiFactorTotpSettings data={data?.viewer.multiFactorSettings} />
        <RecoveryCodesSettings data={data?.viewer.multiFactorSettings} />
        {data.viewer.multiFactorSettings.multiFactorEnabled &&
          <DisableMultiFactor data={data?.viewer.multiFactorSettings} />}
      </Stack>
    </>
  )
}
