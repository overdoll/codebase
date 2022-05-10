import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffAssignArtistButtonMutation } from '@//:artifacts/StaffAssignArtistButtonMutation.graphql'
import { StaffAssignArtistButtonFragment$key } from '@//:artifacts/StaffAssignArtistButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffAssignArtistButtonFragment$key
}

const Fragment = graphql`
  fragment StaffAssignArtistButtonFragment on Account {
    id
    isSecure
  }
`

const Mutation = graphql`
  mutation StaffAssignArtistButtonMutation($input: AssignAccountArtistRole!) {
    assignAccountArtistRole(input: $input) {
      account {
        id
        isArtist
      }
    }
  }
`

export default function StaffAssignArtistButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffAssignArtistButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully assigned artist role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error assigning the artist role`
        })
      }
    }
    )
  }

  return (
    <Button
      isLoading={isInFlight}
      isDisabled={!data.isSecure}
      onClick={onSubmit}
      w='100%'
      size='md'
      colorScheme='green'
    >
      <Trans>
        Assign Artist
      </Trans>
    </Button>
  )
}
