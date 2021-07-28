/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useMutation } from 'react-relay/hooks'
import type { EmailsPrimaryMutation } from '@//:artifacts/EmailsPrimaryMutation.graphql'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingWrench
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-wrench.svg'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'

type Props = {
  emailID: string,
  connectionID: EmailsSettingsFragment$key,
  email: string,
}

const MakeEmailPrimaryMutationGQL = graphql`
  mutation MakePrimaryOptionMutation($input: UpdateAccountEmailStatusToPrimaryInput!, $connections: [ID!]!) {
    updateAccountEmailStatusToPrimary(input: $input) {
      accountEmail @appendNode(connections: $connections, edgeTypeName: "AccountEmailEdge") {
        id
        status
        email
      }
    }
  }
`

export default function MakePrimary ({ emailID, connectionID, email }: Props): Node {
  const [t] = useTranslation('settings')

  const [makePrimary, isMakingPrimary] = useMutation<EmailsPrimaryMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const notify = useToast()

  const onMakePrimary = (id, email) => {
    makePrimary({
      variables: {
        input: {
          accountEmailId: id
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.confirmed.query.success', { email: email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.confirmed.query.error', { email: email }),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <MenuItem
      justify='center' isDisabled={isMakingPrimary} onClick={() => onMakePrimary(emailID, email)}
    >
      <Icon pointerEvents='none' icon={InterfaceSettingWrench} fill='gray.100' w={4} h={4} mr={2} />
      <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.set_primary.button')}</Text>
    </MenuItem>
  )
}
