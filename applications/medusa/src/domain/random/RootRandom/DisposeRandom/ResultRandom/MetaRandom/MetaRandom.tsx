import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaRandomFragment$key } from '@//:artifacts/MetaRandomFragment.graphql'
import { MetaRandomViewerFragment$key } from '@//:artifacts/MetaRandomViewerFragment.graphql'
import RandomRichObject from './RandomRichObject/RandomRichObject'
import ContainerRandom from './ContainerRandom/ContainerRandom'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'

interface Props {
  rootQuery: MetaRandomFragment$key
  viewerQuery: MetaRandomViewerFragment$key | null
}

const RootFragment = graphql`
  fragment MetaRandomFragment on Query {
    ...ContainerRandomFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaRandomViewerFragment on Account {
    ...ContainerRandomViewerFragment
  }
`

export default function MetaRandom (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <RandomRichObject />
      <RootStructuredData />
      <ContainerRandom rootQuery={rootData} viewerQuery={viewerData} />
    </>
  )
}
