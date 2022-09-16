import HomeGameTile from './HomeGameTile/HomeGameTile'
import { FurryFox, HentaiSkirt, RandomizeDice, SearchBar, ThreeDRender } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Heading, Stack } from '@chakra-ui/react'
import HomeLinkTile from './HomeLinkTile/HomeLinkTile'
import getRandomSeed from '@//:modules/support/getRandomSeed'

export default function TilesHome (): JSX.Element {
  const seed = getRandomSeed()

  return (
    <>
      <Stack spacing={24}>
        <HomeGameTile
          href='/roulette'
          bg='https://static.dollycdn.net/banners/roulette-banner.jpg'
          video='https://static.dollycdn.net/banners/roulette-preview.mp4'
          icon={RandomizeDice}
          header={(
            <Trans>
              Rule34 Roulette
            </Trans>
          )}
          footer={(
            <Trans>
              Spin your way through rule34, hentai, furry, 3D porn videos and images and see how long you can last
            </Trans>
          )}
        />
        <Stack spacing={4}>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>Browse Category</Trans>
          </Heading>
          <Stack spacing={8}>
            <HomeLinkTile
              icon={ThreeDRender}
              href='/search/category/3d'
              bg='https://static.dollycdn.net/banners/3d-thumbnail-2.jpeg'
              header={(
                <Trans>
                  3D Porn
                </Trans>
              )}
              footer={(
                <Trans>
                  3D renders and animations pornography
                </Trans>
              )}
            />
            <HomeLinkTile
              icon={HentaiSkirt}
              href='/search/category/hentai'
              bg='https://static.dollycdn.net/banners/hentai-thumbnail.jpeg'
              header={(
                <Trans>
                  Hentai Porn
                </Trans>
              )}
              footer={(
                <Trans>
                  Japanese-style pornography
                </Trans>
              )}
            />
            <HomeLinkTile
              icon={FurryFox}
              bg='https://static.dollycdn.net/banners/furry-thumbnail-2.jpg'
              href='/search/category/furry'
              header={(
                <Trans>
                  Furry Porn
                </Trans>
              )}
              footer={(
                <Trans>
                  Anthro and furry character pornography
                </Trans>
              )}
            />
          </Stack>
        </Stack>
        <Stack spacing={8}>
          <HomeLinkTile
            bg='https://static.dollycdn.net/banners/search-thumbnail.jpg'
            icon={SearchBar}
            href='/search'
            header={(
              <Trans>
                Search Porn
              </Trans>
            )}
            footer={(
              <Trans>
                Search for any kind of porn
              </Trans>
            )}
          />
          <HomeLinkTile
            icon={RandomizeDice}
            bg='https://static.dollycdn.net/banners/browse-thumbnail-2.jpg'
            href={`/random?seed=${seed}`}
            header={(
              <Trans>
                Randomize Porn
              </Trans>
            )}
            footer={(
              <Trans>
                Randomly browse hentai, 3d, furry porn
              </Trans>
            )}
          />
        </Stack>
        <Heading color='gray.00' fontSize='2xl'>
          <Trans>Trending Posts</Trans>
        </Heading>
      </Stack>
    </>
  )
}
