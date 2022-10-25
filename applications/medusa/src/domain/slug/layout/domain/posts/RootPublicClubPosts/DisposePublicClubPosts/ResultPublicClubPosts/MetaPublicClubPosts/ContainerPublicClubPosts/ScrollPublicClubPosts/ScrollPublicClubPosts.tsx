import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { ScrollPublicClubPostsFragment$key } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import { ClubPostsView } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import type {
  ScrollPublicClubPostsAccountFragment$key
} from '@//:artifacts/ScrollPublicClubPostsAccountFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { useFragment } from 'react-relay/hooks'
import PostsSupporterFilters
  from '@//:modules/content/HookedComponents/Filters/fragments/PostsSupporterFilters/PostsSupporterFilters'
import SwapPaginationScroller from '../../../../../../../../components/SwapPaginationScroller/SwapPaginationScroller'
import FilterPublicClubPosts from './FilterPublicClubPosts/FilterPublicClubPosts'
import { useState } from 'react'
import { Icon } from '@//:modules/content/PageLayout'
import { CardPostsView, GalleryPostsView } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface Props {
  clubQuery: ScrollPublicClubPostsFragment$key
  accountQuery: ScrollPublicClubPostsAccountFragment$key | null
}

const ClubFragment = graphql`
  fragment ScrollPublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 6}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      categorySlugs: $categorySlugs,
      seriesSlugs: $seriesSlugs,
      characterSlugs: $characterSlugs,
      supporterOnlyStatus: $supporterOnlyStatus,
      seed: $seed
    )
    @connection (key: "ClubPublicPosts_posts") {
      edges {
        node {
          id
        }
      }
      ...SwapPaginationScrollerFragment
    }
    postsView
    ...FilterPublicClubPostsFragment
  }
`

const AccountFragment = graphql`
  fragment ScrollPublicClubPostsAccountFragment on Account {
    ...PostsSupporterFiltersFragment
  }
`

export default function ScrollPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultPublicClubPostsQuery, any>(
    ClubFragment,
    clubQuery
  )

  const accountData = useFragment(AccountFragment, accountQuery)

  const defaultSort = 'NEW'

  const [postsView, setPostsView] = useState<ClubPostsView>(data.postsView)
  const [savedParams, setSavedParams] = useState<Record<string, any>>({
    sortBy: defaultSort
  })

  const { i18n } = useLingui()

  const onRefetch = (params): void => {
    const {
      sortBy,
      ...restSavedParams
    } = savedParams
    refetch({
      ...restSavedParams,
      ...params,
      sortBy: params.sortBy != null ? params.sortBy : sortBy
    })
    setSavedParams(x => ({
      ...x,
      ...params,
      sortBy: params?.sortBy ?? x.sortBy
    }))
  }

  const onToggleView = (): void => {
    setPostsView(x => x === 'GALLERY' ? 'CARD' : 'GALLERY')
  }

  return (
    <Stack spacing={2}>
      <HStack w='100%' justify='space-between'>
        <PostsSupporterFilters
          defaultValue={defaultSort}
          newLocked={false}
          loadQuery={onRefetch}
          query={accountData}
        />
        <IconButton
          aria-label={i18n._(t`Swap View`)}
          onClick={onToggleView}
          colorScheme='white'
          borderRadius='lg'
          color='gray.00'
          position='relative'
          flexShrink={0}
          icon={<Icon
            icon={postsView === 'CARD' ? GalleryPostsView : CardPostsView}
            fill='gray.900'
            w={4}
            h={4}
                />}
          size='sm'
          variant='solid'
        />
      </HStack>
      <FilterPublicClubPosts
        currentFilters={savedParams}
        loadQuery={onRefetch}
        query={data}
      />
      <SwapPaginationScroller
        type={postsView}
        postConnectionQuery={data.posts}
        hasNext={hasNext}
        loadNext={loadNext}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
