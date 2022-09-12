import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql } from 'react-relay'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner from '../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import CurationProfileAlert from '../CurationProfileAlert/CurationProfileAlert'
import HomeLinkTile from '../HomeLinkTile/HomeLinkTile'
import { FurryFox, HentaiSkirt, RandomizeDice, SearchBar, ThreeDRender } from '@//:assets/icons'
import BrowsePostsPreview from './BrowsePostsPreview/BrowsePostsPreview'
import HomeGameTile from '../HomeGameTile/HomeGameTile'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import getRandomSeed from '@//:modules/support/getRandomSeed'
import VideoContainer from '@//:modules/content/HookedComponents/Media/components/VideoContainer/VideoContainer'
import ImageMedia from '@//:modules/content/HookedComponents/Media/components/ImageMedia/ImageMedia'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery($seed: String) @preloadable {
    ...BrowsePostsPreviewFragment
    viewer {
      ...CurationProfileAlertFragment
      ...AccountInformationBannerFragment
      ...BrowsePostsPreviewViewerFragment
    }
  }
`

export default function Home (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<HomeQuery>(
    Query,
    props.query
  )

  const seed = getRandomSeed()

  return (
    <>
      <Box w='100%' h={500}>
        <VideoContainer
          duration={15}
          hasAudio
          aspectRatio={{
            width: 4,
            height: 3
          }}
          poster={<ImageMedia url='https://static.dollycdn.net/banners/roulette-banner.jpg' />}
          mp4Url='https://static.dollycdn.net/banners/roulette-preview.mp4'
        />
      </Box>
      <AccountInformationBanner query={queryData?.viewer} />
      <CurationProfileAlert query={queryData?.viewer} />
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
          <LinkButton size='md' variant='link' href='/artists'>
            <Trans>
              Are you an artist looking to post your content?
            </Trans>
          </LinkButton>
        </Stack>
        <Stack spacing={4}>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>Trending Posts</Trans>
          </Heading>
          <BrowsePostsPreview postQuery={queryData} viewerQuery={queryData.viewer} />
        </Stack>
      </Stack>
    </>
  )
}
