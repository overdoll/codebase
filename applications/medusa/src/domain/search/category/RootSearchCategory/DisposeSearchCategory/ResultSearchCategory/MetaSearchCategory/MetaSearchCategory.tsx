import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaSearchCategoryFragment$key } from '@//:artifacts/MetaSearchCategoryFragment.graphql'
import { MetaSearchCategoryAccountFragment$key } from '@//:artifacts/MetaSearchCategoryAccountFragment.graphql'
import SearchCategoryRichObject from './SearchCategoryRichObject/SearchCategoryRichObject'
import ContainerSearchCategory from './ContainerSearchCategory/ContainerSearchCategory'

interface Props {
  categoryQuery: MetaSearchCategoryFragment$key
  accountQuery: MetaSearchCategoryAccountFragment$key | null

}

const CharacterFragment = graphql`
  fragment MetaSearchCategoryFragment on Category {
    ...SearchCategoryRichObjectFragment
    ...ContainerSearchCategoryFragment
  }
`

const AccountFragment = graphql`
  fragment MetaSearchCategoryAccountFragment on Account {
    ...ContainerSearchCategoryAccountFragment
  }
`

export default function MetaSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    accountQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      <SearchCategoryRichObject query={categoryData} />
      <ContainerSearchCategory accountQuery={accountData} categoryQuery={categoryData} />
    </>
  )
}
