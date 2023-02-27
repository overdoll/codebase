import { DiscoverClubsTilesFragment$key } from '@//:artifacts/DiscoverClubsTilesFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Grid, Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { ContentBrushPen } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import MemoKey from '@//:modules/content/HookedComponents/Post/components/PaginationScroller/MemoKey/MemoKey'
import DiscoverClubPreview
  from '@//:modules/content/HookedComponents/Club/fragments/DiscoverClubPreview/DiscoverClubPreview'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  rootQuery: DiscoverClubsTilesFragment$key
}

const Fragment = graphql`
  fragment DiscoverClubsTilesFragment on Query {
    discoverClubs(first: 12) {
      edges {
        node {
          id
          ...DiscoverClubPreviewFragment
        }
      }
    }
    viewer {
      ...DiscoverClubPreviewViewerFragment
    }
  }
`

export default function DiscoverClubsTiles (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <Stack spacing={2}>
      <Flex justify='space-between'>
        <PageHeader icon={ContentBrushPen} title={<Trans>Discover clubs</Trans>} />
        <LinkButton size='sm' variant='link' href='/discover'>
          <Trans>
            See all
          </Trans>
        </LinkButton>
      </Flex>
      <Grid
        overflow='visible'
        rowGap={4}
        columnGap={4}
        templateColumns='repeat(auto-fill, minmax(305px, 1fr))'
      >
        {data.discoverClubs.edges.map((item) => (
          <Box
            key={item.node.id}
            position='relative'
          >
            <Box pt='50%' />
            <Box top={0} w='100%' h='100%' position='absolute'>
              <MemoKey memoKey={item.node.id}>
                <DiscoverClubPreview clubQuery={item.node} viewerQuery={data.viewer} />
              </MemoKey>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  )
}
