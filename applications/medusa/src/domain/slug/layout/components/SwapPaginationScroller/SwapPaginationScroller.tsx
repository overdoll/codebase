import { SwapPaginationScrollerFragment$key } from '@//:artifacts/SwapPaginationScrollerFragment.graphql'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import dynamic from 'next/dynamic'
import { ClubPostsView } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'

const LazyGrid = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Post/components/PaginationScroller/GridPaginationScroller/GridPaginationScroller')
  }
)

const LazyList = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Post/components/PaginationScroller/VerticalPaginationScroller/VerticalPaginationScroller')
  }
)

interface Props {
  postConnectionQuery: SwapPaginationScrollerFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  limit?: number
  type?: ClubPostsView
}

const PostConnectionFragment = graphql`
  fragment SwapPaginationScrollerFragment on PostConnection {
    ...VerticalPaginationScrollerFragment
    ...GridPaginationScrollerFragment
  }
`

export default function SwapPaginationScroller (props: Props): JSX.Element {
  const {
    postConnectionQuery,
    type = 'GALLERY',
    ...rest
  } = props

  const data = useFragment(PostConnectionFragment, postConnectionQuery)

  if (type === 'GALLERY') {
    return <LazyGrid postConnectionQuery={data} {...rest} />
  }

  return (
    <LazyList postConnectionQuery={data} {...rest} />
  )
}
