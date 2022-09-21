import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaNewFragment$key } from '@//:artifacts/MetaNewFragment.graphql'
import NewRichObject from './NewRichObject/NewRichObject'
import NewStructuredData from './NewStructuredData/NewStructuredData'
import ContainerNew from './ContainerNew/ContainerNew'

interface Props {
  rootQuery: MetaNewFragment$key
}

const RootFragment = graphql`
  fragment MetaNewFragment on Query {
    ...ContainerNewFragment
  }
`

export default function MetaNew (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <NewRichObject />
      <NewStructuredData />
      <ContainerNew rootQuery={rootData} />
    </>
  )
}
