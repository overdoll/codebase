/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { MakePrimaryOptionMutation } from '@//:artifacts/MakePrimaryOptionMutation.graphql'
import type { MakePrimaryFragment$key } from '@//:artifacts/MakePrimaryFragment.graphql'

import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingWrench
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-wrench.svg'

type Props = {
  emails: MakePrimaryFragment$key
}

const MakePrimaryFragmentGQL = graphql`
  fragment MakePrimaryFragment on AccountEmail {
    id
    email
  }
`

const MakeEmailPrimaryMutationGQL = graphql`
  mutation MakePrimaryOptionMutation($input: UpdateAccountEmailStatusToPrimaryInput!) {
    updateAccountEmailStatusToPrimary(input: $input) {
      updatedAccountEmail {
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

export default function MakePrimary ({ emails }: Props): Node {
  const [t] = useTranslation('settings')

  const data = useFragment(MakePrimaryFragmentGQL, emails)

  const [makePrimary, isMakingPrimary] = useMutation<MakePrimaryOptionMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const notify = useToast()

  const onMakePrimary = () => {
    makePrimary({
      variables: {
        input: {
          accountEmailId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.options.set_primary.query.success', { email: data.email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.options.set_primary.query.error', { email: data.email }),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <MenuItem
      justify='center' isDisabled={isMakingPrimary} onClick={onMakePrimary}
    >
      <Icon pointerEvents='none' icon={InterfaceSettingWrench} fill='gray.100' w={4} h={4} mr={2} />
      <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.set_primary.button')}</Text>
    </MenuItem>
  )
}
