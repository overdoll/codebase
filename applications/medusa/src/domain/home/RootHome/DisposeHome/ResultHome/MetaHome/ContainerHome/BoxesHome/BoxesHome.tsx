import { BoxesHomeFragment$key } from '@//:artifacts/BoxesHomeFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Grid, GridItem } from '@chakra-ui/react'
import BoxHomeLink from './BoxHomeLink/BoxHomeLink'
import { Trans } from '@lingui/macro'

interface Props {
  viewerQuery: BoxesHomeFragment$key | null
}

const ViewerFragment = graphql`
  fragment BoxesHomeFragment on Account {
    ...BannerHomeViewerFragment
  }
`

export default function BoxesHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <Grid
        rowGap={20}
        columnGap={20}
        templateColumns={{
          base: 'repeat(1, minmax(150px, 1fr))',
          md: 'repeat(2, minmax(150px, 1fr))'
        }}
      >
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              href='/random'
              colorScheme='primary'
              header={<Trans>RANDOM</Trans>}
              footer={<Trans>Randomly browse rule34, hentai, furry and 3d porn</Trans>}
              url='https://static.dollycdn.net/banners/search-thumbnail.jpg'
            />
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              href='/search'
              colorScheme='purple'
              header={<Trans>SEARCH</Trans>}
              footer={<Trans>Search for any kind of porn</Trans>}
              url='https://static.dollycdn.net/banners/browse-thumbnail-2.jpg'
            />
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              smaller
              href='/roulette'
              colorScheme='green'
              header={<Trans>ROULETTE</Trans>}
              footer={(
                <Trans> Spin your way through porn videos and images and see how long
                  you can
                  last
                </Trans>)}
              url='https://static.dollycdn.net/banners/search-thumbnail.jpg'
            />
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              smaller
              href='/supporter'
              colorScheme='orange'
              header={<Trans>SUPPORT</Trans>}
              footer={<Trans>Become a supporter and unlock access to exclusive content and platform features</Trans>}
              url='https://static.dollycdn.net/banners/discover-thumbnail.jpg'
            />
          </Center>
        </GridItem>
        <GridItem colSpan={{
          base: 1,
          md: 2
        }}
        >
          <Center w='100%' h='100%'>
            <Box w='100%' maxW={500}>
              <BoxHomeLink
                smaller
                href='/feedback'
                colorScheme='teal'
                header={<Trans>FEEDBACK</Trans>}
                footer={<Trans>Tell us what you really think about overdoll so we can make it better</Trans>}
                url='https://static.dollycdn.net/banners/search-thumbnail.jpg'
              />
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </>

  )
}
