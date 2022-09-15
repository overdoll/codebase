import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCategoryFragment$key } from '@//:artifacts/MetaSearchCategoryFragment.graphql'
import { MetaSearchCategoryViewerFragment$key } from '@//:artifacts/MetaSearchCategoryViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import SearchCategoryRichObject from './SearchCategoryRichObject/SearchCategoryRichObject'
import ContainerSearchCategory from './ContainerSearchCategory/ContainerSearchCategory'

interface Props {
  categoryQuery: MetaSearchCategoryFragment$key
  viewerQuery: MetaSearchCategoryViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment MetaSearchCategoryFragment on Category {
    ...SearchCategoryRichObjectFragment
    ...ContainerSearchCategoryFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaSearchCategoryViewerFragment on Account {
    ...ContainerSearchCategoryViewerFragment
  }
`

export default function MetaSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    viewerQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <SearchCategoryRichObject query={categoryData} />
      <GlobalVideoManagerProvider>
        <ContainerSearchCategory categoryQuery={categoryData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
