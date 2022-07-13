import { Tooltip } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  RemovePostContentUploadButtonFragment$key
} from '@//:artifacts/RemovePostContentUploadButtonFragment.graphql'
import type {
  RemovePostContentUploadButtonPostFragment$key
} from '@//:artifacts/RemovePostContentUploadButtonPostFragment.graphql'
import type { RemovePostContentUploadButtonMutation } from '@//:artifacts/RemovePostContentUploadButtonMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'

interface Props {
  query: RemovePostContentUploadButtonFragment$key
  postQuery: RemovePostContentUploadButtonPostFragment$key
}

const Fragment = graphql`
  fragment RemovePostContentUploadButtonFragment on PostContent {
    id
    resource {
      id
    }
    ...ResourceInfoFragment
  }
`

const PostFragment = graphql`
  fragment RemovePostContentUploadButtonPostFragment on Post {
    id
    ...ResourceInfoFragment
  }
`

const Mutation = graphql`
  mutation RemovePostContentUploadButtonMutation($input: RemovePostContentInput!) {
    removePostContent(input: $input) {
      post {
        id
        reference
        content {
          resource {
            id
            type
            processed
            failed
            urls {
              url
              mimeType
            }
          }
        }
      }
    }
  }
`

export default function RemovePostContentUploadButton ({
  query,
  postQuery

}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const uppy = useUppyContext()

  const { i18n } = useLingui()

  const notify = useToast()

  const [removeContent, isRemovingContent] = useMutation<RemovePostContentUploadButtonMutation>(Mutation)

  const onRemoveContent = (): void => {
    const index = postData.content.indexOf(data.id)

    removeContent({
      variables: {
        input: {
          id: postData.id,
          contentIds: [data.id]
        }
      },
      onCompleted () {
        uppy.removeFile(`${data.id}_${index}`)
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error removing post content`
        })
      }
    })
  }

  return (
    <Tooltip
      placement='bottom'
      label={(
        <Trans>
          Remove Post Content
        </Trans>)}
    >
      <CloseButton
        isLoading={isRemovingContent}
        size='md'
        aria-label={i18n._(t`Remove Upload`)}
        m={2}
        onClick={onRemoveContent}
      />
    </Tooltip>
  )
}
