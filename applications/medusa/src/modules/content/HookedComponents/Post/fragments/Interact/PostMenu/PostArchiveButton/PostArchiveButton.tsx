import { t, Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostArchiveButtonFragment$key } from '@//:artifacts/PostArchiveButtonFragment.graphql'
import { PostArchiveButtonMutation } from '@//:artifacts/PostArchiveButtonMutation.graphql'
import { useFragment, useMutation } from 'react-relay/hooks'
import { MenuItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { ArchiveFile } from '@//:assets/icons'
import { useToast } from '../../../../../../ThemeComponents'

interface Props {
  query: PostArchiveButtonFragment$key
}

const Fragment = graphql`
  fragment PostArchiveButtonFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation PostArchiveButtonMutation($input: ArchivePostInput!) {
    archivePost(input: $input) {
      post {
        id
        state
      }
    }
  }
`

export default function PostArchiveButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<PostArchiveButtonMutation>(Mutation)

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
          title: t`Post was archived successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error archiving the post`
        })
      }
    })
  }

  return (
    <MenuItem
      onClick={onArchive}
      isLoading={isInFlight}
      text={<Trans>Archive Post</Trans>}
      icon={ArchiveFile}
      colorScheme='green'
    />
  )
}
