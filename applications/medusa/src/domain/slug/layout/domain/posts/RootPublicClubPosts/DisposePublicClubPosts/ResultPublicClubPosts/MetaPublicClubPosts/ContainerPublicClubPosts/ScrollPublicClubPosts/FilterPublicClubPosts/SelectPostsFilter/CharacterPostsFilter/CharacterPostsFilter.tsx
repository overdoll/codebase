import { graphql, useFragment } from 'react-relay/hooks'
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '@//:modules/constants/theme'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Box, Heading } from '@chakra-ui/react'
import { CharacterPostsFilterFragment$key } from '@//:artifacts/CharacterPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'

interface Props {
  loadQuery: FilterPostsRefetch
  query: CharacterPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment CharacterPostsFilterFragment on Character {
    id
    slug
    series {
      slug
    }
    club {
      slug
    }
    name
  }
`

export default function CharacterPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.characterSlugs?.[0] === data.slug && (currentFilters?.seriesSlugs?.[0] === data?.club?.slug || currentFilters?.seriesSlugs?.[0] === data?.series?.slug)
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
      characterSlugs: [data.slug],
      seriesSlugs: [data?.club?.slug ?? data?.series?.slug],
      categorySlugs: null
    })
  }

  return (
    <ClickableTile w='auto' h='auto' onClick={onFilter}>
      <Box
        maxW={300}
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
          {data.name}
        </Heading>
      </Box>
    </ClickableTile>
  )
}
