import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffRevokeArtistButtonMutation } from '@//:artifacts/StaffRevokeArtistButtonMutation.graphql'
import { StaffRevokeArtistButtonFragment$key } from '@//:artifacts/StaffRevokeArtistButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffRevokeArtistButtonFragment$key
}

const Fragment = graphql`
  fragment StaffRevokeArtistButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation StaffRevokeArtistButtonMutation($input: RevokeAccountArtistRole!) {
    revokeAccountArtistRole(input: $input) {
      account {
        id
        isArtist
      }
    }
  }
`

export default function StaffRevokeArtistButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffRevokeArtistButtonMutation>(Mutation)

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
          title: t`Successfully revoked artist role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error revoking the artist role`
        })
      }
    }
    )
  }

  return (
    <Button
      isLoading={isInFlight}
      onClick={onSubmit}
      w='100%'
      size='md'
      colorScheme='orange'
    >
      <Trans>
        Revoke Artist
      </Trans>
    </Button>
  )
}
