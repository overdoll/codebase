import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCategoryFragment$key } from '@//:artifacts/ContainerSearchCategoryFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCategory from './HeaderSearchCategory/HeaderSearchCategory'
import ScrollSearchCategory from './ScrollSearchCategory/ScrollSearchCategory'

interface Props {
  categoryQuery: ContainerSearchCategoryFragment$key
}

const CharacterFragment = graphql`
  fragment ContainerSearchCategoryFragment on Category {
    ...HeaderSearchCategoryFragment
    ...ScrollSearchCategoryFragment
  }
`

export default function ContainerSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)

  return (
    <>
      <MobileContainer pt={2}>
        <HeaderSearchCategory categoryQuery={categoryData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchCategory categoryQuery={categoryData} />
      </ContentContainer>
    </>
  )
}
