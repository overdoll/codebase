import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenPostFragment$key } from '@//:artifacts/RouletteScreenPostFragment.graphql'
import { graphql } from 'react-relay'
import { RouletteScreenPostViewerFragment$key } from '@//:artifacts/RouletteScreenPostViewerFragment.graphql'
import PostGalleryPublicContained
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicContained/PostGalleryPublicContained'
import { useMemo } from 'react'

interface Props {
  query: RouletteScreenPostFragment$key
  viewerQuery: RouletteScreenPostViewerFragment$key | null

}

const Fragment = graphql`
  fragment RouletteScreenPostFragment on Post {
    id
    ...PostGalleryPublicContainedFragment
  }
`

const ViewerFragment = graphql`
  fragment RouletteScreenPostViewerFragment on Account {
    ...PostGalleryPublicContainedViewerFragment
  }
`

export default function RouletteScreenPost (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return useMemo(() => <PostGalleryPublicContained postQuery={data} viewerQuery={viewerData} />, [data.id])
}
