import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { ArrangeUpPostContentButtonFragment$key } from '@//:artifacts/ArrangeUpPostContentButtonFragment.graphql'
import type {
  ArrangeUpPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeUpPostContentButtonPostFragment.graphql'
import type { ArrangeUpPostContentButtonMutation } from '@//:artifacts/ArrangeUpPostContentButtonMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { ArrowButtonUp } from '@//:assets/icons'
import { useToast } from '@//:modules/content/ThemeComponents'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { onArrangeUp } from '../../../../ArrangeHelpers/ArrangeHelpers'

interface Props {
  query: ArrangeUpPostContentButtonFragment$key
  postQuery: ArrangeUpPostContentButtonPostFragment$key
}

const Fragment = graphql`
  fragment ArrangeUpPostContentButtonFragment on PostContent {
    id
    ...ResourceInfoFragment
  }
`

const PostFragment = graphql`
  fragment ArrangeUpPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

const Mutation = graphql`
  mutation ArrangeUpPostContentButtonMutation($input: UpdatePostContentOrderInput!) {
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

export default function ArrangeUpPostContentButton ({
  query,
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const [arrangeContent, isArrangingContent] = useMutation<ArrangeUpPostContentButtonMutation>(Mutation)

  const notify = useToast()

  const index = postData.content.findIndex(item => item.id === data.id)

  const onArrangeContent = (): void => {
    const arrangedContent = onArrangeUp(index, postData.content)

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
          title: t`Error moving content up`
        })
      }
    })
  }

  if (index === 0) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onArrangeContent}
      isLoading={isArrangingContent}
      text={<Trans>Move Up</Trans>}
      icon={ArrowButtonUp}
    />
  )
}
