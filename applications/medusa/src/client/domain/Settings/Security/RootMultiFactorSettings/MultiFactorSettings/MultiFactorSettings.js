/**
 * @flow
 */
import { Flex, Stack } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import MultiFactorTotpSettings from './MultiFactorTotpSettings/MultiFactorTotpSettings'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import RecoveryCodesSettings from './RecoveryCodes/RecoveryCodesSettings'

type Props = {
  query: PreloadedQueryInner<MultiFactorSettingsQuery>,
}

const MultiFactorQueryGQL = graphql`
  query MultiFactorSettingsQuery {
    viewer {
      multiFactorSettings {
        multiFactorEnabled
        ...MultiFactorTotpSettingsFragment
        ...RecoveryCodesSettingsFragment
      }
    }
  }
`

export default function MultiFactorSettings (props: Props): Node {
  const queryData = usePreloadedQuery<MultiFactorSettingsQuery>(
    MultiFactorQueryGQL,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <Stack spacing={3}>
        <MultiFactorTotpSettings data={queryData?.viewer.multiFactorSettings} />
        <RecoveryCodesSettings data={queryData?.viewer.multiFactorSettings} />
      </Stack>
    </>
  )
}
