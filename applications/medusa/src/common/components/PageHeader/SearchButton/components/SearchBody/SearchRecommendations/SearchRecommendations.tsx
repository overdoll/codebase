import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { SearchRecommendationsQuery } from '@//:artifacts/SearchRecommendationsQuery.graphql'
import { Stack, useBreakpointValue } from '@chakra-ui/react'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SEARCH_SLIDE_HEIGHT, SEARCH_SLIDE_WIDTH, SEARCH_SWIPER_PROPS } from '../../../constants'
import { CategoryIdentifier, CharacterIdentifier, SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import SearchHeader from '../SearchHeader/SearchHeader'
import SearchResultsCharacter from '../SearchResults/SearchResultsUnion/SearchResultsCharacter/SearchResultsCharacter'
import SearchResultsCategory from '../SearchResults/SearchResultsUnion/SearchResultsCategory/SearchResultsCategory'
import SearchResultsSeries from '../SearchResults/SearchResultsUnion/SearchResultsSeries/SearchResultsSeries'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SearchRecommendationsQuery {
    characters(first: 17) {
      edges {
        node {
          ...SearchResultsCharacterFragment
        }
      }
    }
    categories(first: 17) {
      edges {
        node {
          ...SearchResultsCategoryFragment
        }
      }
    }
    series(first: 17) {
      edges {
        node {
          ...SearchResultsSeriesFragment
        }
      }
    }
  }
`

export default function SearchRecommendations ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SearchRecommendationsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const slideHeight = useBreakpointValue(SEARCH_SLIDE_HEIGHT)
  const slideWidth = useBreakpointValue(SEARCH_SLIDE_WIDTH)

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <SearchHeader icon={CharacterIdentifier}>
          <Trans>
            Characters
          </Trans>
        </SearchHeader>
        <Swiper {...SEARCH_SWIPER_PROPS}>
          {queryData.characters.edges.map((item, index) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={index}
            >
              <SearchResultsCharacter query={item.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Stack spacing={2}>
        <SearchHeader icon={CategoryIdentifier}>
          <Trans>
            Categories
          </Trans>
        </SearchHeader>
        <Swiper {...SEARCH_SWIPER_PROPS}>
          {queryData.categories.edges.map((item, index) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={index}
            >
              <SearchResultsCategory query={item.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Stack spacing={2}>
        <SearchHeader icon={SeriesIdentifier}>
          <Trans>
            Series
          </Trans>
        </SearchHeader>
        <Swiper {...SEARCH_SWIPER_PROPS}>
          {queryData.series.edges.map((item, index) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={index}
            >
              <SearchResultsSeries query={item.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  )
}
