/**
 * @flow
 */
import { Flex, Text, Heading, Box, Tooltip } from '@chakra-ui/react'
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
        <Box>
          <Heading color='gray.100' fontSize='lg'>
            {t('security.multi_factor.totp.title')}
          </Heading>
          {data.multiFactorTotpConfigured
            ? <Text color='gray.200' fontSize='sm'>
              {t('security.multi_factor.totp.tags.configured')}
            </Text>
            : <Text color='gray.200' fontSize='sm'>
              {t('security.multi_factor.totp.tags.not_configured')}
            </Text>}
        </Box>
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
