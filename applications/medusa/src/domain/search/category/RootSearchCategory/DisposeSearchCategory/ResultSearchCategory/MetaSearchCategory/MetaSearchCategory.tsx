import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCategoryFragment$key } from '@//:artifacts/MetaSearchCategoryFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import SearchCategoryRichObject from './SearchCategoryRichObject/SearchCategoryRichObject'
import ContainerSearchCategory from './ContainerSearchCategory/ContainerSearchCategory'

interface Props {
  categoryQuery: MetaSearchCategoryFragment$key
}

const CharacterFragment = graphql`
  fragment MetaSearchCategoryFragment on Category {
    ...SearchCategoryRichObjectFragment
    ...ContainerSearchCategoryFragment
  }
`

export default function MetaSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)

  return (
    <>
      <SearchCategoryRichObject query={categoryData} />
      <GlobalVideoManagerProvider>
        <ContainerSearchCategory categoryQuery={categoryData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
