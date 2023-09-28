import {
  ControlPlayButton, RandomizeDice,
  SearchBar,
} from '@//:assets/icons'
import { DEFAULT_SEED } from '@//:modules/constants/theme'
import hash from '@//:modules/utilities/hash'
import { Random } from '@//:modules/utilities/random'
import { Center, Grid, GridItem } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { useMemo } from 'react'
import { useCookies } from 'react-cookie'
import BoxHomeLink from '../BoxHomeLink/BoxHomeLink'

export default function BoxesHome (): JSX.Element {
  const [cookies] = useCookies<string>(['od.local.postSeed'])
  const postSeed = cookies['od.local.postSeed']

  const memoized = useMemo(() => new Random(hash(postSeed ?? DEFAULT_SEED)), [postSeed ?? DEFAULT_SEED])

  const images = {
    RANDOM: [
      {
        small: 'https://static.dollycdn.net/banners/boxes/0_0/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/0_0/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/0_0/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/0_1/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/0_1/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/0_1/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/0_2/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/0_2/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/0_2/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/0_3/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/0_3/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/0_3/large.jpg',
      },
    ],
    SEARCH: [
      {
        small: 'https://static.dollycdn.net/banners/boxes/1_0/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/1_0/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/1_0/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/1_1/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/1_1/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/1_1/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/1_2/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/1_2/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/1_2/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/1_3/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/1_3/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/1_3/large.jpg',
      },
    ],
    ROULETTE: [
      {
        small: 'https://static.dollycdn.net/banners/boxes/2_0/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/2_0/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/2_0/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/2_1/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/2_1/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/2_1/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/2_2/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/2_2/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/2_2/large.jpg',
      },
      {
        small: 'https://static.dollycdn.net/banners/boxes/2_3/small.jpg',
        medium: 'https://static.dollycdn.net/banners/boxes/2_3/medium.jpg',
        large: 'https://static.dollycdn.net/banners/boxes/2_3/large.jpg',
      },
    ],
  }

  const chosen = useMemo(() => memoized.nextInt32([0, 3]), [postSeed ?? DEFAULT_SEED])

  return (
    <>
      <Grid
        rowGap={20}
        columnGap={20}
        templateColumns={{
          base: 'repeat(1, minmax(150px, 1fr))',
          md: 'repeat(2, minmax(150px, 1fr))',
        }}
      >
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              icon={RandomizeDice}
              href='/random'
              colorScheme='primary'
              header={<Trans>RANDOM</Trans>}
              footer={<Trans>Randomly browse rule34, hentai, furry and 3d porn</Trans>}
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet={images.RANDOM[chosen].large}
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet={images.RANDOM[chosen].medium}
                  />
                </>
              )}
              url={images.RANDOM[chosen].small}
            />
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              icon={SearchBar}
              href='/search'
              colorScheme='purple'
              header={<Trans>SEARCH</Trans>}
              footer={<Trans>Search for any kind of porn</Trans>}
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet={images.SEARCH[chosen].large}
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet={images.SEARCH[chosen].medium}
                  />
                </>
              )}
              url={images.SEARCH[chosen].small}
            />
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              icon={ControlPlayButton}
              smaller
              href='/roulette'
              colorScheme='green'
              header={<Trans>ROULETTE</Trans>}
              footer={(
                <Trans> Spin your way through porn videos and images and see how long
                  you can
                  last
                </Trans>)}
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet={images.ROULETTE[chosen].large}
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet={images.ROULETTE[chosen].medium}
                  />
                </>
              )}
              url={images.ROULETTE[chosen].small}
            />
          </Center>
        </GridItem>
      </Grid>
    </>

  )
}
