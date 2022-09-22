import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaBrowseFragment$key } from '@//:artifacts/MetaBrowseFragment.graphql'
import BrowseRichObject from './BrowseRichObject/BrowseRichObject'
import BrowseStructuredData from './BrowseStructuredData/BrowseStructuredData'
import ContainerBrowse from './ContainerBrowse/ContainerBrowse'

interface Props {
  rootQuery: MetaBrowseFragment$key
}

const RootFragment = graphql`
  fragment MetaBrowseFragment on Query {
    ...ContainerBrowseFragment
  }
`

export default function MetaBrowse (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <BrowseRichObject />
      <BrowseStructuredData />
      <ContainerBrowse rootQuery={rootData} />
    </>
  )
}
