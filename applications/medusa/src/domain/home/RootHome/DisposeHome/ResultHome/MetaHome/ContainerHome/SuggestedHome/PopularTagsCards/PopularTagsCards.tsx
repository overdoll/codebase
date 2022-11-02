import { PopularTagsCardsFragment$key } from '@//:artifacts/PopularTagsCardsFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Grid, Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { CategoryIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import MemoKey from '@//:modules/content/HookedComponents/Post/components/PaginationScroller/MemoKey/MemoKey'
import SearchResultsUnion
  from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchResults/SearchResultsUnion/SearchResultsUnion'

interface Props {
  rootQuery: PopularTagsCardsFragment$key
}

const Fragment = graphql`
  fragment PopularTagsCardsFragment on Query {
    tags(first: 9) {
      edges {
        node {
          __id
          __typename
          ...SearchResultsUnionFragment
        }
      }
    }
  }
`

export default function PopularTagsCards (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <Stack spacing={2}>
      <PageHeader icon={CategoryIdentifier} title={<Trans>Popular tags</Trans>} />
      <Grid
        overflow='visible'
        rowGap={4}
        columnGap={4}
        templateColumns='repeat(auto-fill, minmax(160px, 1fr))'
      >
        {data.tags.edges.map((item) => (
          <Box
            key={item.node.__id}
            position='relative'
          >
            <Box pt='130%' />
            <Box top={0} w='100%' h='100%' position='absolute'>
              <MemoKey memoKey={item.node.__id}>
                <SearchResultsUnion query={item.node} />
              </MemoKey>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  )
}
