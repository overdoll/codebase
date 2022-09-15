import { Tooltip } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { RemovePostContentButtonFragment$key } from '@//:artifacts/RemovePostContentButtonFragment.graphql'
import type { RemovePostContentButtonPostFragment$key } from '@//:artifacts/RemovePostContentButtonPostFragment.graphql'
import type { RemovePostContentButtonMutation } from '@//:artifacts/RemovePostContentButtonMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import { DeleteBin } from '@//:assets/icons'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: RemovePostContentButtonFragment$key
  postQuery: RemovePostContentButtonPostFragment$key
  isButton?: boolean
}

const Fragment = graphql`
  fragment RemovePostContentButtonFragment on PostContent {
    id
    resource {
      id
    }
    ...ResourceInfoFragment
  }
`

const PostFragment = graphql`
  fragment RemovePostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

const Mutation = graphql`
  mutation RemovePostContentButtonMutation($input: RemovePostContentInput!) {
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

export default function RemovePostContentButton ({
  query,
  postQuery,
  isButton = false
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const uppy = useUppyContext()

  const notify = useToast()

  const [removeContent, isRemovingContent] = useMutation<RemovePostContentButtonMutation>(Mutation)

  const onRemoveContent = (): void => {
    const index = postData.content.findIndex(item => item.id === data.id)

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

  if (isButton) {
    return (
      <Button
        onClick={onRemoveContent}
        isLoading={isRemovingContent}
        size='sm'
        colorScheme='orange'
      >
        <Trans>
          Remove Content
        </Trans>
      </Button>
    )
  }

  return (
    <Tooltip
      placement='bottom'
      label={(
        <Trans>
          Remove Content
        </Trans>)}
    >
      <MenuItem
        onClick={onRemoveContent}
        isLoading={isRemovingContent}
        text={<Trans>Remove Content</Trans>}
        icon={DeleteBin}
      />
    </Tooltip>
  )
}
