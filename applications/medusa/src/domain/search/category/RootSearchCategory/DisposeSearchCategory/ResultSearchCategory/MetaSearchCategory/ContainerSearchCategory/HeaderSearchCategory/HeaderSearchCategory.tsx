import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchCategoryFragment$key } from '@//:artifacts/HeaderSearchCategoryFragment.graphql'
import SearchSummary from '@//:common/components/PageHeader/SearchSummary/SearchSummary'
import { Trans } from '@lingui/macro'
import { HStack, Stack } from '@chakra-ui/react'
import SearchCategoryCopyLinkButton from './SearchCategoryCopyLinkButton/SearchCategoryCopyLinkButton'
import SearchCategoryShareDiscordButton from './SearchCategoryShareDiscordButton/SearchCategoryShareDiscordButton'
import SearchCategoryShareRedditButton from './SearchCategoryShareRedditButton/SearchCategoryShareRedditButton'
import SearchCategoryShareTwitterButton from './SearchCategoryShareTwitterButton/SearchCategoryShareTwitterButton'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'

interface Props {
  categoryQuery: HeaderSearchCategoryFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderSearchCategoryFragment on Category {
    totalPosts
    totalLikes
    title
    ...SearchCategoryCopyLinkButtonFragment
    ...SearchCategoryShareDiscordButtonFragment
    ...SearchCategoryShareRedditButtonFragment
    ...SearchCategoryShareTwitterButtonFragment
  }
`

export default function HeaderSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)

  return (
    <Stack spacing={2}>
      <SearchSummary
        title={categoryData.title}
        type={<Trans>Category</Trans>}
        totalPosts={categoryData.totalPosts}
        totalLikes={categoryData.totalLikes}
      />
      <HStack justify='space-between' spacing={2}>
        <HStack spacing={1}>
          <SearchCategoryCopyLinkButton query={categoryData} />
          <SearchCategoryShareDiscordButton query={categoryData} />
          <SearchCategoryShareRedditButton query={categoryData} />
          <SearchCategoryShareTwitterButton query={categoryData} />
        </HStack>
      </HStack>
    </Stack>
  )
}
