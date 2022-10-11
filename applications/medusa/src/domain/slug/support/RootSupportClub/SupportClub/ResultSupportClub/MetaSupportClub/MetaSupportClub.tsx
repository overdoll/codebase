import { graphql, useFragment } from 'react-relay/hooks'
import type { MetaPublicPostFragment$key } from '@//:artifacts/MetaPublicPostFragment.graphql'
import type { MetaPublicPostViewerFragment$key } from '@//:artifacts/MetaPublicPostViewerFragment.graphql'
import React from 'react'
import ContainerSupportClub from './ContainerSupportClub/ContainerSupportClub'

interface Props {
  clubQuery: MetaPublicPostFragment$key
  viewerQuery: MetaPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment MetaSupportClubFragment on Club {
    ...ContainerSupportClubFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaSupportClubViewerFragment on Account {
    ...ContainerSupportClubViewerFragment
  }
`

export default function MetaSupportClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(PostFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)
  return (
    <>
      <ContainerSupportClub clubQuery={clubData} viewerQuery={viewerData} />
    </>
  )
}
