import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchCategoryFragment$key } from '@//:artifacts/HeaderSearchCategoryFragment.graphql'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchCategoryCopyLinkButton from './SearchCategoryCopyLinkButton/SearchCategoryCopyLinkButton'
import SearchCategoryShareDiscordButton from './SearchCategoryShareDiscordButton/SearchCategoryShareDiscordButton'
import SearchCategoryShareRedditButton from './SearchCategoryShareRedditButton/SearchCategoryShareRedditButton'
import SearchCategoryShareTwitterButton from './SearchCategoryShareTwitterButton/SearchCategoryShareTwitterButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import React from 'react'
import CategoryBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/CategoryBanner/CategoryBanner'

interface Props {
  categoryQuery: HeaderSearchCategoryFragment$key
}

const CharacterFragment = graphql`
  fragment HeaderSearchCategoryFragment on Category {
    title
    ...CategoryBannerFragment
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
      <TileOverlay backdrop={(
        <CategoryBanner categoryQuery={categoryData} />
      )}
      >
        <Stack minH={150} spacing={2} align='center' justify='center' px={2}>
          <Heading textAlign='center' fontSize='3xl' color='gray.00'>
            {categoryData.title}
          </Heading>
          <Heading textAlign='center' fontSize='lg' color='gray.100'>
            <Trans>
              Category
            </Trans>
          </Heading>
        </Stack>
      </TileOverlay>
      <HStack justify='flex-end' spacing={1}>
        <SearchCategoryCopyLinkButton query={categoryData} />
        <SearchCategoryShareDiscordButton query={categoryData} />
        <SearchCategoryShareRedditButton query={categoryData} />
        <SearchCategoryShareTwitterButton query={categoryData} />
      </HStack>
    </Stack>
  )
}
