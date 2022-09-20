import { graphql } from 'react-relay'
import type { SeriesThumbnailFragment$key } from '@//:artifacts/SeriesThumbnailFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment SeriesThumbnailFragment on Series {
    id
    bannerMedia {
      __typename
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  seriesQuery: SeriesThumbnailFragment$key
}

export default function SeriesThumbnail (props: Props): JSX.Element {
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
