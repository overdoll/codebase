/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
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
        <Box>
          <Heading color='gray.100' fontSize='lg'>
            {t('security.multi_factor.recovery_codes.title')}
          </Heading>
          {data.recoveryCodesGenerated
            ? <Text color='gray.200' fontSize='sm'>
              {t('security.multi_factor.recovery_codes.tags.configured')}
            </Text>
            : <Text color='gray.200' fontSize='sm'>
              {t('security.multi_factor.recovery_codes.tags.not_configured')}
            </Text>}

        </Box>
        {data.recoveryCodesGenerated
          ? <Link to='/configure/multi_factor/recovery_codes'>
            <Button colorScheme='gray' size='md'>
              {t('security.multi_factor.recovery_codes.button.show')}
            </Button>
          </Link>
          : (
            <Link to='/configure/multi_factor/recovery_codes'>
              <Button colorScheme='gray' size='md'>
                {t('security.multi_factor.recovery_codes.button.set_up')}
              </Button>
            </Link>
            )}
      </Flex>
    </>
  )
}
