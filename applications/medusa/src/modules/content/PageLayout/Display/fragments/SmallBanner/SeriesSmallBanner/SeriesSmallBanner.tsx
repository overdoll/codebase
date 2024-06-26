import { graphql } from 'react-relay'
import { SeriesSmallBannerFragment$key } from '@//:artifacts/SeriesSmallBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment SeriesSmallBannerFragment on Series {
    id
    bannerMedia {
      __typename
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  seriesQuery: SeriesSmallBannerFragment$key
}

export default function SeriesSmallBanner (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const data = useFragment(Fragment, seriesQuery)

  if (data.bannerMedia == null || data.bannerMedia.__typename === 'RawMedia') {
    return (
      <CoverImage>
        <RandomPattern seed={data.id} />
      </CoverImage>
    )
  }

  return (
    <ThumbnailMedia mediaQuery={data.bannerMedia} />
  )
}
