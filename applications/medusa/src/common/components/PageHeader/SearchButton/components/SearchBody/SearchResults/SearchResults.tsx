import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { SearchResultsQuery } from '@//:artifacts/SearchResultsQuery.graphql'
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import SearchResultsUnion from './SearchResultsUnion/SearchResultsUnion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SEARCH_SLIDE_HEIGHT, SEARCH_SLIDE_WIDTH, SEARCH_SWIPER_PROPS } from '../../../constants'
import { SearchSmall } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import SearchHeader from '../SearchHeader/SearchHeader'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query SearchResultsQuery($search: String!) {
    search(query: $search, first: 14) {
      edges {
        node {
          ...SearchResultsUnionFragment
        }
      }
    }
  }
`

export default function SearchResults ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SearchResultsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const slideHeight = useBreakpointValue(SEARCH_SLIDE_HEIGHT)
  const slideWidth = useBreakpointValue(SEARCH_SLIDE_WIDTH)

  if (searchArguments.variables.search === '') {
    return (
      <></>
    )
  }

  const EmptyOrFilledSearch = (): JSX.Element => {
    if (queryData.search.edges.length < 1) {
      return (
        <Stack h={SEARCH_SLIDE_HEIGHT} justify='center' align='center' spacing={2}>
          <Heading textAlign='center' color='gray.200' fontSize='lg'>
            <Trans>
              We couldn't find a club, category, character, or series with the
              {/* eslint-disable-next-line react/prop-types */}
              name {searchArguments.variables.search}
            </Trans>
          </Heading>
        </Stack>
      )
    }

    return (
      <Swiper {...SEARCH_SWIPER_PROPS}>
        {queryData.search.edges.map((item, index) => (
          <SwiperSlide
            style={{
              height: slideHeight,
              width: slideWidth
            }}
            key={index}
          >
            <SearchResultsUnion query={item.node} />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }

  return (
    <Stack spacing={2}>
      <SearchHeader icon={SearchSmall}>
        <Trans>
          Search Results
        </Trans>
      </SearchHeader>
      <EmptyOrFilledSearch />
    </Stack>
  )
}
