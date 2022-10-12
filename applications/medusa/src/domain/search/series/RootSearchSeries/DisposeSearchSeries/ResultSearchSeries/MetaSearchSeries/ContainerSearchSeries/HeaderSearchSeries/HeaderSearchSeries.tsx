import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderSearchSeriesFragment$key } from '@//:artifacts/HeaderSearchSeriesFragment.graphql'
import { Trans } from '@lingui/macro'
import SearchSeriesRecommendations from './SearchSeriesRecommendations/SearchSeriesRecommendations'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchSeriesCopyLinkButton from './SearchSeriesCopyLinkButton/SearchSeriesCopyLinkButton'
import SearchSeriesShareDiscordButton from './SearchSeriesShareDiscordButton/SearchSeriesShareDiscordButton'
import SearchSeriesShareRedditButton from './SearchSeriesShareRedditButton/SearchSeriesShareRedditButton'
import SearchSeriesShareTwitterButton from './SearchSeriesShareTwitterButton/SearchSeriesShareTwitterButton'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import React from 'react'
import SeriesBanner from '@//:modules/content/PageLayout/Display/fragments/Banner/SeriesBanner/SeriesBanner'

interface Props {
  seriesQuery: HeaderSearchSeriesFragment$key
}

const SeriesFragment = graphql`
  fragment HeaderSearchSeriesFragment on Series {
    title
    ...SeriesBannerFragment
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
      <TileOverlay backdrop={(
        <SeriesBanner seriesQuery={seriesData} />
      )}
      >
        <Stack minH={150} spacing={2} align='center' justify='center' px={2}>
          <Heading textAlign='center' fontSize='3xl' color='gray.00'>
            {seriesData.title}
          </Heading>
          <Heading textAlign='center' fontSize='lg' color='gray.100'>
            <Trans>
              Series
            </Trans>
          </Heading>
        </Stack>
      </TileOverlay>
      <SearchSeriesRecommendations query={seriesData} />
      <HStack justify='flex-end' spacing={1}>
        <SearchSeriesCopyLinkButton query={seriesData} />
        <SearchSeriesShareDiscordButton query={seriesData} />
        <SearchSeriesShareRedditButton query={seriesData} />
        <SearchSeriesShareTwitterButton query={seriesData} />
      </HStack>
    </Stack>
  )
}
