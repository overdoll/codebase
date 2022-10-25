import { graphql, useFragment } from 'react-relay/hooks'
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '@//:modules/constants/theme'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Box, Heading } from '@chakra-ui/react'
import { SeriesPostsFilterFragment$key } from '@//:artifacts/SeriesPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'

interface Props {
  loadQuery: FilterPostsRefetch
  query: SeriesPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment SeriesPostsFilterFragment on Series {
    id
    slug
    title
  }
`

export default function SeriesPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.seriesSlugs?.[0] === data.slug && currentFilters?.characterSlugs == null
  const isInactive = !isActive && (currentFilters?.characterSlugs != null || currentFilters?.seriesSlugs != null || currentFilters?.categorySlugs != null)

  const memoized = useMemo(() => new Random(hash(data.id ?? DEFAULT_SEED)), [data.id])

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [data.id])

  const bgColor = TAG_COLOR_PALETTE[chosenColor]

  const onFilter = (): void => {
    if (isActive) {
      loadQuery({
        characterSlugs: null,
        seriesSlugs: null,
        categorySlugs: null
      })
      return
    }
    loadQuery({
      characterSlugs: null,
      seriesSlugs: [data.slug],
      categorySlugs: null
    })
  }

  return (
    <ClickableTile w='auto' h='auto' onClick={onFilter}>
      <Box
        maxW={400}
        borderRadius='lg'
        px={{
          base: 2,
          md: 3
        }}
        py={{
          base: 1,
          md: 2
        }}
        opacity={isInactive ? 0.4 : 1}
        bg={bgColor}
      >
        <Heading
          noOfLines={2}
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          color='dimmers.700'
        >
          {data.title}
        </Heading>
      </Box>
    </ClickableTile>
  )
}
