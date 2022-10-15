import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { SearchRecommendationsQuery } from '@//:artifacts/SearchRecommendationsQuery.graphql'
import { Center, Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SEARCH_SLIDE_HEIGHT, SEARCH_SLIDE_WIDTH, SEARCH_SWIPER_PROPS } from '../../../constants'
import { CategoryIdentifier, CharacterIdentifier, ContentBrushPen, SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import SearchHeader from '../SearchHeader/SearchHeader'
import SearchResultsCharacter from '../SearchResults/SearchResultsUnion/SearchResultsCharacter/SearchResultsCharacter'
import SearchResultsCategory from '../SearchResults/SearchResultsUnion/SearchResultsCategory/SearchResultsCategory'
import SearchResultsSeries from '../SearchResults/SearchResultsUnion/SearchResultsSeries/SearchResultsSeries'
import SearchResultsClub from '../SearchResults/SearchResultsUnion/SearchResultsClub/SearchResultsClub'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SearchRecommendationsQuery {
    characters(first: 17) {
      edges {
        node {
          id
          ...SearchResultsCharacterFragment
        }
      }
    }
    categories(first: 17) {
      edges {
        node {
          id
          ...SearchResultsCategoryFragment
        }
      }
    }
    series(first: 17) {
      edges {
        node {
          id
          ...SearchResultsSeriesFragment
        }
      }
    }
    discoverClubs(first: 8) {
      edges {
        node {
          id
          ...SearchResultsClubFragment
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
          {queryData.characters.edges.map((item) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={item.node.id}
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
          {queryData.categories.edges.map((item) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={item.node.id}
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
          {queryData.series.edges.map((item) => (
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
              key={item.node.id}
            >
              <SearchResultsSeries query={item.node} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      {queryData.discoverClubs.edges.length > 0 && (
        <Stack spacing={2}>
          <SearchHeader icon={ContentBrushPen}>
            <Trans>
              Clubs
            </Trans>
          </SearchHeader>
          <Swiper {...SEARCH_SWIPER_PROPS}>
            {queryData.discoverClubs.edges.map((item) => (
              <SwiperSlide
                style={{
                  height: slideHeight,
                  width: slideWidth
                }}
                key={item.node.id}
              >
                <SearchResultsClub query={item.node} />
              </SwiperSlide>
            ))}
            <SwiperSlide
              style={{
                height: slideHeight,
                width: slideWidth
              }}
            >
              <LinkTile href='/discover'>
                <Center px={2} bg='gray.800' w='100%' h='100%' borderRadius='md'>
                  <Heading fontSize='md' textAlign='center'>
                    <Trans>
                      Discover all clubs
                    </Trans>
                  </Heading>
                </Center>
              </LinkTile>
            </SwiperSlide>
          </Swiper>
        </Stack>
      )}
    </Stack>
  )
}
