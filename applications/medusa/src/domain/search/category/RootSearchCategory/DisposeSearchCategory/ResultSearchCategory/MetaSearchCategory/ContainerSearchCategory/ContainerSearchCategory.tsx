import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCategoryFragment$key } from '@//:artifacts/ContainerSearchCategoryFragment.graphql'
import { ContainerSearchCategoryViewerFragment$key } from '@//:artifacts/ContainerSearchCategoryViewerFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCategory from './HeaderSearchCategory/HeaderSearchCategory'
import ScrollSearchCategory from './ScrollSearchCategory/ScrollSearchCategory'

interface Props {
  categoryQuery: ContainerSearchCategoryFragment$key
  viewerQuery: ContainerSearchCategoryViewerFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerSearchCategoryFragment on Category {
    ...HeaderSearchCategoryFragment
    ...ScrollSearchCategoryFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerSearchCategoryViewerFragment on Account {
    ...ScrollSearchCategoryViewerFragment
  }
`

export default function ContainerSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    viewerQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchCategory categoryQuery={categoryData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchCategory categoryQuery={categoryData} viewerQuery={viewerData} />
      </ContentContainer>
    </>
  )
}
