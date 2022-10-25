import { graphql, useFragment } from 'react-relay/hooks'
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '@//:modules/constants/theme'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Box, Heading } from '@chakra-ui/react'
import { CategoryPostsFilterFragment$key } from '@//:artifacts/CategoryPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'

interface Props {
  loadQuery: FilterPostsRefetch
  query: CategoryPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment CategoryPostsFilterFragment on Category {
    id
    slug
    title
  }
`

export default function CategoryPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.categorySlugs?.[0] === data.slug
  const isInactive = !isActive && (currentFilters?.characterSlugs != null || currentFilters?.seriesSlugs != null || currentFilters?.categorySlugs != null)

  const memoized = useMemo(() => new Random(hash(data.id ?? DEFAULT_SEED)), [data.id])

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [data.id])

  const bgColor = TAG_COLOR_PALETTE[chosenColor]

  const onFilter = (): void => {
    if (isActive) {
      loadQuery({
        categorySlugs: null,
        characterSlugs: null,
        seriesSlugs: null
      })
      return
    }
    loadQuery({
      categorySlugs: [data.slug],
      characterSlugs: null,
      seriesSlugs: null
    })
  }

  return (
    <ClickableTile w='auto' h='auto' onClick={onFilter}>
      <Box
        maxW={200}
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
