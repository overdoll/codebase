import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaTopFragment$key } from '@//:artifacts/MetaTopFragment.graphql'
import ContainerTop from './ContainerTop/ContainerTop'
import TopRichObject from './TopRichObject/TopRichObject'
import TopStructuredData from './TopStructuredData/TopStructuredData'

interface Props {
  rootQuery: MetaTopFragment$key
}

const RootFragment = graphql`
  fragment MetaTopFragment on Query {
    ...ContainerTopFragment
  }
`

export default function MetaTop (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <TopRichObject />
      <TopStructuredData />
      <ContainerTop rootQuery={rootData} />
    </>
  )
}
