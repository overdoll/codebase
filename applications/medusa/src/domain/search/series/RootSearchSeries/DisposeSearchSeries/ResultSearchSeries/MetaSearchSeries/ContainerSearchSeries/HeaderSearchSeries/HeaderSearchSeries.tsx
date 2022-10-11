import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchSeriesFragment$key } from '@//:artifacts/HeaderSearchSeriesFragment.graphql'
import SearchSummary from '@//:common/components/PageHeader/SearchSummary/SearchSummary'
import { Trans } from '@lingui/macro'
import SearchSeriesRecommendations from './SearchSeriesRecommendations/SearchSeriesRecommendations'
import { HStack, Stack } from '@chakra-ui/react'
import SearchSeriesCopyLinkButton from './SearchSeriesCopyLinkButton/SearchSeriesCopyLinkButton'
import SearchSeriesShareDiscordButton from './SearchSeriesShareDiscordButton/SearchSeriesShareDiscordButton'
import SearchSeriesShareRedditButton from './SearchSeriesShareRedditButton/SearchSeriesShareRedditButton'
import SearchSeriesShareTwitterButton from './SearchSeriesShareTwitterButton/SearchSeriesShareTwitterButton'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'

interface Props {
  seriesQuery: HeaderSearchSeriesFragment$key
}

const SeriesFragment = graphql`
  fragment HeaderSearchSeriesFragment on Series {
    title
    totalPosts
    totalLikes
    ...SearchSeriesRecommendationsFragment
    ...SearchSeriesCopyLinkButtonFragment
    ...SearchSeriesShareDiscordButtonFragment
    ...SearchSeriesShareRedditButtonFragment
    ...SearchSeriesShareTwitterButtonFragment
  }
`

export default function HeaderSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const seriesData = useFragment(SeriesFragment, seriesQuery)

  return (
    <Stack spacing={2}>
      <SearchSummary
        title={seriesData.title}
        type={<Trans>Series</Trans>}
        totalPosts={seriesData.totalPosts}
        totalLikes={seriesData.totalLikes}
      />
      <SearchSeriesRecommendations query={seriesData} />
      <HStack justify='space-between' spacing={2}>
        <HStack spacing={1}>
          <SearchSeriesCopyLinkButton query={seriesData} />
          <SearchSeriesShareDiscordButton query={seriesData} />
          <SearchSeriesShareRedditButton query={seriesData} />
          <SearchSeriesShareTwitterButton query={seriesData} />
        </HStack>
      </HStack>
    </Stack>
  )
}
