/**
 * @flow
 */

import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { MultiFactorTotpHeaderQuery } from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpFlow from '../MultiFactorTotpFlow/MultiFactorTotpFlow'
import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'

type Props = {
  query: MultiFactorTotpHeaderQuery
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

export default function MultiFactorTotpHeader (props: Props): Node {
  const queryData = usePreloadedQuery<MultiFactorTotpHeaderQuery>(
    MultiFactorTotpHeaderQueryGQL,
    props.query
  )

  const [t] = useTranslation('configure')

  if (!queryData.viewer.multiFactorSettings.recoveryCodesGenerated) {
    return (
      <Flex direction='column' align='center'>
        <Alert mb={3} status='warning'>
          <AlertIcon />
          <AlertDescription>
            {t('totp.empty.alert')}
          </AlertDescription>
        </Alert>
        <Link to='/configure/multi_factor/recovery_codes'>
          <Button
            colorScheme='gray' size='md'
          >
            {t('totp.empty.button')}
          </Button>
        </Link>
      </Flex>
    )
  }

  return (
    <>
      {queryData?.viewer.multiFactorSettings.multiFactorTotpConfigured &&
        <Flex mb={3} direction='column' align='center'>
          <Alert status='warning'>
            <AlertIcon />
            <AlertDescription lineHeight={5} fontSize='sm'>
              {t('totp.configured.description')}
            </AlertDescription>
          </Alert>
        </Flex>}
      <MultiFactorTotpFlow />
    </>
  )
}
