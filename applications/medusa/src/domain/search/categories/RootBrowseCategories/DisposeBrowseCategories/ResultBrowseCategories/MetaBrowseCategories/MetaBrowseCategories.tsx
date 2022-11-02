import { MetaBrowseCategoriesFragment$key } from '@//:artifacts/MetaBrowseCategoriesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ContainerBrowseCategories from './ContainerBrowseCategories/ContainerBrowseCategories'
import BrowseCategoriesRichObject from './BrowseCategoriesRichObject/BrowseCategoriesRichObject'

interface Props {
  rootQuery: MetaBrowseCategoriesFragment$key
}

const Fragment = graphql`
  fragment MetaBrowseCategoriesFragment on Query {
    ...ContainerBrowseCategoriesFragment
  }
`

export default function MetaBrowseCategories (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <BrowseCategoriesRichObject />
      <ContainerBrowseCategories rootQuery={data} />
    </>
  )
}
