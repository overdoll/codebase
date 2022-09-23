import { t, Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostUnArchiveButtonFragment$key } from '@//:artifacts/PostUnArchiveButtonFragment.graphql'
import { PostUnArchiveButtonMutation } from '@//:artifacts/PostUnArchiveButtonMutation.graphql'
import { useFragment, useMutation } from 'react-relay/hooks'
import { MenuItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { ArchiveFile } from '@//:assets/icons'
import { useToast } from '../../../../../../ThemeComponents'

interface Props {
  query: PostUnArchiveButtonFragment$key
}

const Fragment = graphql`
  fragment PostUnArchiveButtonFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation PostUnArchiveButtonMutation($input: UnArchivePostInput!) {
    unArchivePost(input: $input) {
      post {
        id
        state
      }
    }
  }
`

export default function PostUnArchiveButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<PostUnArchiveButtonMutation>(Mutation)

  const notify = useToast()

  const onArchive = (): void => {
    commit({
      variables: {
        input: {
          id: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Post was un-archived successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error un-archiving the post`
        })
      }
    })
  }

  return (
    <MenuItem
      onClick={onArchive}
      isLoading={isInFlight}
      text={<Trans>Un-Archive Post</Trans>}
      icon={ArchiveFile}
      colorScheme='green'
    />
  )
}
