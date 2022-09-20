import { graphql } from 'react-relay'
import type { SeriesBannerFragment$key } from '@//:artifacts/SeriesBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { BannerMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment SeriesBannerFragment on Series {
    id
    bannerMedia {
      ...BannerMediaFragment
    }
  }
`

interface Props {
  seriesQuery: SeriesBannerFragment$key
}

export default function SeriesBanner (props: Props): JSX.Element {
  const {
    seriesQuery
  } = props

  const data = useFragment(Fragment, seriesQuery)

  if (data.bannerMedia == null) {
    return (
      <CoverImage>
        <RandomPattern seed={data.id} />
      </CoverImage>
    )
  }

  return (
    <BannerMedia mediaQuery={data.bannerMedia} />
  )
}
