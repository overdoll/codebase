import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaHomeFragment$key } from '@//:artifacts/MetaHomeFragment.graphql'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'
import RootHomeRichObject from './RootHomeRichObject/RootHomeRichObject'
import ContainerHome from './ContainerHome/ContainerHome'

interface Props {
  rootQuery: MetaHomeFragment$key
}

const Fragment = graphql`
  fragment MetaHomeFragment on Query {
    ...ContainerHomeFragment
  }
`

export default function MetaHome (props: Props): JSX.Element {
  const {
    rootQuery,
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <RootHomeRichObject />
      <RootStructuredData />
      <ContainerHome rootQuery={data} />
    </>
  )
}
