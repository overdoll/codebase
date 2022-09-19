import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  ArrangeDownPostContentButtonFragment$key
} from '@//:artifacts/ArrangeDownPostContentButtonFragment.graphql'
import type {
  ArrangeDownPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeDownPostContentButtonPostFragment.graphql'
import type { ArrangeDownPostContentButtonMutation } from '@//:artifacts/ArrangeDownPostContentButtonMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { ArrowButtonDown } from '@//:assets/icons'
import { useToast } from '@//:modules/content/ThemeComponents'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { onArrangeDown } from '../../../../ArrangeHelpers/ArrangeHelpers'

interface Props {
  query: ArrangeDownPostContentButtonFragment$key
  postQuery: ArrangeDownPostContentButtonPostFragment$key
}

const Fragment = graphql`
  fragment ArrangeDownPostContentButtonFragment on PostContent {
    id
  }
`

const PostFragment = graphql`
  fragment ArrangeDownPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

const Mutation = graphql`
  mutation ArrangeDownPostContentButtonMutation($input: UpdatePostContentOrderInput!) {
    updatePostContentOrder(input: $input) {
      post {
        id
        reference
        content {
          id
        }
      }
    }
  }
`

export default function ArrangeDownPostContentButton ({
  query,
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const [arrangeContent, isArrangingContent] = useMutation<ArrangeDownPostContentButtonMutation>(Mutation)

  const notify = useToast()

  const index = postData.content.findIndex(item => item.id === data.id)

  const onArrangeContent = (): void => {
    const arrangedContent = onArrangeDown(index, postData.content)

    arrangeContent({
      variables: {
        input: {
          id: postData.id,
          contentIds: arrangedContent.map((item) => item.id)
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error moving content down`
        })
      }
    })
  }

  if (index + 1 === postData.content.length || postData.content.length < 2) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onArrangeContent}
      isLoading={isArrangingContent}
      text={<Trans>Move Down</Trans>}
      icon={ArrowButtonDown}
    />
  )
}
