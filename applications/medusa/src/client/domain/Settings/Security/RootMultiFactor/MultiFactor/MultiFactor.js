/**
 * @flow
 */
import { Flex, Stack } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorQuery } from '@//:artifacts/MultiFactorQuery.graphql'
import { useTranslation } from 'react-i18next'
import MultiFactorTotp from './MultiFactorTotp/MultiFactorTotp'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import RecoveryCodes from './RecoveryCodes/RecoveryCodes'

type Props = {
  query: PreloadedQueryInner<MultiFactorQuery>,
}

const MultiFactorQueryGQL = graphql`
  query MultiFactorQuery {
    viewer {
      multiFactorSettings {
        multiFactorEnabled
        ...MultiFactorTotpFragment
        recoveryCodesGenerated
      }
    }
  }
`

export default function MultiFactor (props: Props): Node {
  const queryData = usePreloadedQuery<MultiFactorQuery>(
    MultiFactorQueryGQL,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <Stack spacing={3}>
        <MultiFactorTotp data={queryData?.viewer.multiFactorSettings} />
        <RecoveryCodes />
      </Stack>
    </>
  )
}
