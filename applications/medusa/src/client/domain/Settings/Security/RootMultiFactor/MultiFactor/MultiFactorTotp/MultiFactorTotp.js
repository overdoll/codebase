/**
 * @flow
 */
import { Flex, Stack, Text, Heading, Box } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorTotpFragment$key } from '@//:artifacts/MultiFactorTotpFragment.graphql'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceValidationCheckCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-circle.svg'
import InterfaceDeleteCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-circle.svg'

type Props = {
  data: MultiFactorTotpFragment$key
}

const MultiFactorTotpFragmentGQL = graphql`
  fragment MultiFactorTotpFragment on AccountMultiFactorSettings {
    multiFactorTotpConfigured
    canDisableMultiFactor
  }
`

export default function MultiFactorTotp (props: Props): Node {
  const data = useFragment(MultiFactorTotpFragmentGQL, props.data)

  console.log(data)

  const [t] = useTranslation('settings')

  return (
    <>
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Heading fontSize='lg'>
            {t('security.multi_factor.totp.title')}
          </Heading>
          <Icon
            ml={2} icon={data.multiFactorTotpConfigured ? InterfaceValidationCheckCircle : InterfaceDeleteCircle}
            fill={data.multiFactorTotpConfigured ? 'green.300' : 'orange.300'} w={4} h={4}
          />
        </Flex>
        {data.multiFactorTotpConfigured
          ? <></>
          : <Link to='/settings/multi_factor/totp/setup'>
            <Button colorScheme='red' size='sm'>
              {t('security.multi_factor.totp.button.set_up')}
            </Button>
          </Link>}

      </Flex>
    </>
  )
}
