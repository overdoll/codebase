import { graphql, useFragment } from 'react-relay/hooks'
import type { ContentModifyPreviewFragment$key } from '@//:artifacts/ContentModifyPreviewFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostContentPreviewMemo from './PostContentPreviewMemo/PostContentPreviewMemo'

interface Props {
  query: ContentModifyPreviewFragment$key
}

const Fragment = graphql`
  fragment ContentModifyPreviewFragment on Post {
    content {
      ...PostContentPreviewMemoFragment
    }
    ...PostContentPreviewMemoPostFragment
  }
`

export default function ContentModifyPreview ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.content.length < 1) {
    return (
      <></>
    )
  }

  return (
    <Stack spacing={2}>
      {data.content.map((item, index) => (
        <PostContentPreviewMemo key={index} query={item} postQuery={data} />
      ))}
    </Stack>
  )
}
