/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Box, Flex, Text, Heading, Badge } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { RecoveryCodesSettingsFragment$key } from '@//:artifacts/RecoveryCodesSettingsFragment.graphql'

type Props = {
  data: RecoveryCodesSettingsFragment$key
}

const RecoveryCodesFragmentGQL = graphql`
  fragment RecoveryCodesSettingsFragment on AccountMultiFactorSettings {
    recoveryCodesGenerated
  }
`

export default function RecoveryCodesSettings (props: Props): Node {
  const data = useFragment(RecoveryCodesFragmentGQL, props.data)

  const [t] = useTranslation('settings')

  return (
    <>
      <Flex align='center' justify='space-between'>
        <Flex align='flex-start' justify='center' direction='column'>
          <Heading mb={1} color='gray.00' fontSize='lg'>
            {t('security.multi_factor.recovery_codes.title')}
          </Heading>
          <Badge fontSize='xs' colorScheme={data.recoveryCodesGenerated ? 'green' : 'orange'}>
            {data.recoveryCodesGenerated
              ? t('security.multi_factor.recovery_codes.tags.configured')
              : t('security.multi_factor.recovery_codes.tags.not_configured')}
          </Badge>
        </Flex>
        <Link to='/configure/multi_factor/recovery_codes'>
          <Button colorScheme='gray' size='md'>
            {data.recoveryCodesGenerated
              ? t('security.multi_factor.recovery_codes.button.show')
              : t('security.multi_factor.recovery_codes.button.set_up')}
          </Button>
        </Link>
      </Flex>
    </>
  )
}
