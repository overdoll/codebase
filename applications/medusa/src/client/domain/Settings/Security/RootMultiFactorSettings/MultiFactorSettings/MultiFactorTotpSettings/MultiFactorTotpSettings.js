/**
 * @flow
 */
import { Flex, Text, Heading, Box, Tooltip, Badge } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorTotpSettingsFragment$key } from '@//:artifacts/MultiFactorTotpSettingsFragment.graphql'

type Props = {
  data: MultiFactorTotpSettingsFragment$key
}

const MultiFactorTotpFragmentGQL = graphql`
  fragment MultiFactorTotpSettingsFragment on AccountMultiFactorSettings {
    multiFactorTotpConfigured
    recoveryCodesGenerated
  }
`

export default function MultiFactorTotpSettings (props: Props): Node {
  const data = useFragment(MultiFactorTotpFragmentGQL, props.data)

  const [t] = useTranslation('settings')

  return (
    <>
      <Flex align='center' justify='space-between'>
        <Flex align='flex-start' justify='center' direction='column'>
          <Heading mb={1} color='gray.100' fontSize='lg'>
            {t('security.multi_factor.totp.title')}
          </Heading>
          <Badge fontSize='xs' colorScheme={data.multiFactorTotpConfigured ? 'green' : 'orange'}>
            {data.multiFactorTotpConfigured
              ? t('security.multi_factor.totp.tags.configured')
              : t('security.multi_factor.totp.tags.not_configured')}
          </Badge>
        </Flex>
        {data.multiFactorTotpConfigured
          ? <></>
          : (
            <Tooltip
              isDisabled={data.recoveryCodesGenerated} shouldWrapChildren
              label={t('security.multi_factor.totp.button.restricted')}
            >
              <Link to='/configure/multi_factor/totp'>
                <Button disabled={!data.recoveryCodesGenerated} colorScheme='gray' size='md'>
                  {t('security.multi_factor.totp.button.set_up')}
                </Button>
              </Link>
            </Tooltip>
            )}
      </Flex>
    </>
  )
}
