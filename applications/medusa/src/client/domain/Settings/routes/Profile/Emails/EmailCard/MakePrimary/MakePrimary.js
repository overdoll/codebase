/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useMutation } from 'react-relay/hooks'
import type { MakePrimaryOptionMutation } from '@//:artifacts/MakePrimaryOptionMutation.graphql'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingWrench
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-wrench.svg'

type Props = {
  emailID: string,
  email: string,
}

const MakeEmailPrimaryMutationGQL = graphql`
  mutation MakePrimaryOptionMutation($input: UpdateAccountEmailStatusToPrimaryInput!) {
    updateAccountEmailStatusToPrimary(input: $input) {
      accountEmail {
        id
        status
        email
        account {
          emails {
            edges {
              node {
                id
                email
                status
              }
            }
          }
        }
      }
    }
  }
`

export default function MakePrimary ({ emailID, email }: Props): Node {
  const [t] = useTranslation('settings')

  const [makePrimary, isMakingPrimary] = useMutation<MakePrimaryOptionMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const notify = useToast()

  const onMakePrimary = (id, email) => {
    makePrimary({
      variables: {
        input: {
          accountEmailId: id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.options.set_primary.query.success', { email: email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.options.set_primary.query.error', { email: email }),
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
