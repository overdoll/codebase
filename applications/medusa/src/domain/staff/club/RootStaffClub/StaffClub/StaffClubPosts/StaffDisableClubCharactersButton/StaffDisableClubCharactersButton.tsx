import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  StaffDisableClubCharactersButtonFragment$key
} from '@//:artifacts/StaffDisableClubCharactersButtonFragment.graphql'
import {
  StaffDisableClubCharactersButtonMutation
} from '@//:artifacts/StaffDisableClubCharactersButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffDisableClubCharactersButtonFragment$key
}

const Fragment = graphql`
  fragment StaffDisableClubCharactersButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffDisableClubCharactersButtonMutation($input: DisableClubCharactersInput!) {
    disableClubCharacters(input: $input) {
      club {
        id
        charactersEnabled
        charactersLimit
      }
    }
  }
`

export default function StaffDisableClubCharactersButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffDisableClubCharactersButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          clubId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully disabled characters for this club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error disabling characters for this club`
        })
      }
    }
    )
  }

  return (
    <Button
      size='sm'
      isLoading={isInFlight}
      onClick={onSubmit}
      w='100%'
      colorScheme='orange'
    >
      <Trans>
        Disable Club Characters
      </Trans>
    </Button>
  )
}
