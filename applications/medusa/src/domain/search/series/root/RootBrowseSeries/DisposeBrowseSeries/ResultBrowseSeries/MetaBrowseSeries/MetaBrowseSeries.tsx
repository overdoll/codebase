import { MetaBrowseSeriesFragment$key } from '@//:artifacts/MetaBrowseSeriesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import BrowseSeriesRichObject from './BrowseSeriesRichObject/BrowseSeriesRichObject'
import ContainerBrowseSeries from './ContainerBrowseSeries/ContainerBrowseSeries'

interface Props {
  rootQuery: MetaBrowseSeriesFragment$key
}

const Fragment = graphql`
  fragment MetaBrowseSeriesFragment on Query {
    ...ContainerBrowseSeriesFragment
  }
`

export default function MetaBrowseSeries (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <BrowseSeriesRichObject />
      <ContainerBrowseSeries rootQuery={data} />
    </>
  )
}
