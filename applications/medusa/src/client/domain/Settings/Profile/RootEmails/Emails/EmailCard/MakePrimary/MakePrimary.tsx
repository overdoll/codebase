import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { MakePrimaryOptionMutation } from '@//:artifacts/MakePrimaryOptionMutation.graphql'
import type { MakePrimaryFragment$key } from '@//:artifacts/MakePrimaryFragment.graphql'
import { useToast } from '@chakra-ui/react'
import { SmallMenuItem } from '@//:modules/content/PageLayout'
import { SettingWrench } from '@//:assets/icons/navigation'

interface Props {
  query: MakePrimaryFragment$key
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
      primaryAccountEmail {
        id
        email
        status
      }
      updatedAccountEmail {
        id
        email
        status
      }
    }
  }
`

export default function MakePrimary ({ query }: Props): JSX.Element {
  const [t] = useTranslation('settings')

  const data = useFragment(MakePrimaryFragmentGQL, query)

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
    <SmallMenuItem
      icon={SettingWrench}
      text={t('profile.email.options.set_primary.button')}
      isDisabled={isMakingPrimary}
      onClick={onMakePrimary}
    />
  )
}
