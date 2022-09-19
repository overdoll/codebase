import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { ChangeClubThumbnailUploadFragment$key } from '@//:artifacts/ChangeClubThumbnailUploadFragment.graphql'
import { ChangeClubThumbnailUploadMutation } from '@//:artifacts/ChangeClubThumbnailUploadMutation.graphql'
import SingleFileImageUpload
  from '@//:modules/content/HookedComponents/Upload/components/SingleFileImageUpload/SingleFileImageUpload'

interface Props {
  query: ChangeClubThumbnailUploadFragment$key
}

const Fragment = graphql`
  fragment ChangeClubThumbnailUploadFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation ChangeClubThumbnailUploadMutation ($input: UpdateClubThumbnailInput!) {
    updateClubThumbnail(input: $input) {
      club {
        id
        name
        thumbnail {
          type
          urls {
            url
            mimeType
          }
          preview
          width
          height
          ...ResourceItemFragment
        }
      }
    }
  }
`

export default function ChangeClubThumbnailUpload ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, IsInFlight] = useMutation<ChangeClubThumbnailUploadMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (url): void => {
    if (url == null || url === '') return
    commit({
      variables: {
        input: {
          id: data.id,
          thumbnail: url
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated your club thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club thumbnail`
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
