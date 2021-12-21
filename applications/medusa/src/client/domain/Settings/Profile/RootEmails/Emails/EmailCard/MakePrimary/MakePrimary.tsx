import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { MakePrimaryOptionMutation } from '@//:artifacts/MakePrimaryOptionMutation.graphql'
import type { MakePrimaryFragment$key } from '@//:artifacts/MakePrimaryFragment.graphql'
import { useToast } from '@chakra-ui/react'
import { SmallMenuItem } from '@//:modules/content/PageLayout'
import { SettingWrench } from '@//:assets/icons/navigation'
import { t, Trans } from '@lingui/macro'

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
  const data = useFragment(MakePrimaryFragmentGQL, query)

  const [makePrimary, isMakingPrimary] = useMutation<MakePrimaryOptionMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const notify = useToast()

  const onMakePrimary = (): void => {
    makePrimary({
      variables: {
        input: {
          accountEmailId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`${data.email} was set as your Primary email`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error setting ${data.email} to Primary`,
          isClosable: true
        })
      }
    })
  }

  return (
    <SmallMenuItem
      icon={SettingWrench}
      text={<Trans>Make Primary</Trans>}
      isDisabled={isMakingPrimary}
      onClick={onMakePrimary}
    />
  )
}
