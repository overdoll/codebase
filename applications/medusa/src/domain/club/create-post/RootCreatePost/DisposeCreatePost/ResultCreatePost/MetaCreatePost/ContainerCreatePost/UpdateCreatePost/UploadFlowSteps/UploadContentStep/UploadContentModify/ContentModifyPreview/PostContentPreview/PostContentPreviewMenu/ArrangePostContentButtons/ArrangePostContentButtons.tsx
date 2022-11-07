import { ArrangePostContentButtonsFragment$key } from '@//:artifacts/ArrangePostContentButtonsFragment.graphql'
import { ArrangePostContentButtonsPostFragment$key } from '@//:artifacts/ArrangePostContentButtonsPostFragment.graphql'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import ArrangeUpPostContentButton from './ArrangeUpPostContentButton/ArrangeUpPostContentButton'
import ArrangeDownPostContentButton from './ArrangeDownPostContentButton/ArrangeDownPostContentButton'
import { ArrangePostContentButtonsMutation } from '@//:artifacts/ArrangePostContentButtonsMutation.graphql'
import { onArrangeDown, onArrangeIndex, onArrangeUp } from '../../../../ArrangeHelpers/ArrangeHelpers'
import { t } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import ArrangeFirstPostContentButton from './ArrangeFirstPostContentButton/ArrangeFirstPostContentButton'
import ArrangeLastPostContentButton from './ArrangeLastPostContentButton/ArrangeLastPostContentButton'

interface Props {
  query: ArrangePostContentButtonsFragment$key
  postQuery: ArrangePostContentButtonsPostFragment$key
}

const Fragment = graphql`
  fragment ArrangePostContentButtonsFragment on PostContent {
    id
    ...ArrangeUpPostContentButtonFragment
    ...ArrangeDownPostContentButtonFragment
    ...ArrangeFirstPostContentButtonFragment
    ...ArrangeLastPostContentButtonFragment
  }
`

const PostFragment = graphql`
  fragment ArrangePostContentButtonsPostFragment on Post {
    id
    content {
      id
    }
    ...ArrangeUpPostContentButtonPostFragment
    ...ArrangeDownPostContentButtonPostFragment
    ...ArrangeFirstPostContentButtonPostFragment
    ...ArrangeLastPostContentButtonPostFragment
  }
`

const Mutation = graphql`
  mutation ArrangePostContentButtonsMutation($input: UpdatePostContentOrderInput!) {
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

export default function ArrangePostContentButtons ({
  query,
  postQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const postData = useFragment(PostFragment, postQuery)

  const [arrangeContent, isArrangingContent] = useMutation<ArrangePostContentButtonsMutation>(Mutation)

  const notify = useToast()

  const index = postData.content.findIndex(item => item.id === data.id)

  const onMoveUp = (): void => {
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

  const onMoveDown = (): void => {
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

  const onMoveFirst = (): void => {
    const arrangedContent = onArrangeIndex(index, 0, postData.content)

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
          title: t`Error moving content to first`
        })
      }
    })
  }

  const onMoveLast = (): void => {
    const arrangedContent = onArrangeIndex(index, postData.content.length - 1, postData.content)

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
          title: t`Error moving content to last`
        })
      }
    })
  }

  return (
    <>
      <ArrangeUpPostContentButton
        onClick={onMoveUp}
        isLoading={isArrangingContent}
        query={data}
        postQuery={postData}
      />
      <ArrangeDownPostContentButton
        onClick={onMoveDown}
        isLoading={isArrangingContent}
        query={data}
        postQuery={postData}
      />
      <ArrangeFirstPostContentButton
        onClick={onMoveFirst}
        isLoading={isArrangingContent}
        query={data}
        postQuery={postData}
      />
      <ArrangeLastPostContentButton
        onClick={onMoveLast}
        isLoading={isArrangingContent}
        query={data}
        postQuery={postData}
      />
    </>
  )
}
