import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { ChangeClubHeaderUploadFragment$key } from '@//:artifacts/ChangeClubHeaderUploadFragment.graphql'
import { ChangeClubHeaderUploadMutation } from '@//:artifacts/ChangeClubHeaderUploadMutation.graphql'
import SingleFileImageUpload
  from '@//:modules/content/HookedComponents/Upload/components/SingleFileImageUpload/SingleFileImageUpload'

interface Props {
  query: ChangeClubHeaderUploadFragment$key
}

const Fragment = graphql`
  fragment ChangeClubHeaderUploadFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation ChangeClubHeaderUploadMutation ($input: UpdateClubHeaderInput!) {
    updateClubHeader(input: $input) {
      club {
        id
        ...ClubIconFragment
      }
    }
  }
`

export default function ChangeClubHeaderUpload ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, IsInFlight] = useMutation<ChangeClubHeaderUploadMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (url): void => {
    if (url == null || url === '') return
    commit({
      variables: {
        input: {
          id: data.id,
          header: url
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated your club header`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club header`
        })
      }
    }
    )
  }

  return (
    <SingleFileImageUpload
      isLoading={IsInFlight}
      onChange={onSubmit}
    />
  )
}
