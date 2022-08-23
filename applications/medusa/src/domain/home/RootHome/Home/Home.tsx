import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql } from 'react-relay'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner from '../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import CurationProfileAlert from '../CurationProfileAlert/CurationProfileAlert'
import HomeLinkTile from '../HomeLinkTile/HomeLinkTile'
import { FurryFox, HentaiSkirt, RandomizeDice, SearchBar, ThreeDRender } from '@//:assets/icons'
import BrowsePostsPreview from './BrowsePostsPreview/BrowsePostsPreview'

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

  return (
    <>
      <AccountInformationBanner query={queryData?.viewer} />
      <CurationProfileAlert query={queryData?.viewer} />
      <Stack spacing={24}>
        <Stack spacing={4}>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>Show By Category</Trans>
          </Heading>
          <Stack spacing={8}>
            <HomeLinkTile
              icon={ThreeDRender}
              href='/search/category/3d'
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
            href='/random'
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
