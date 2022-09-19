import { graphql } from 'react-relay'
import type { AudienceBannerFragment$key } from '@//:artifacts/AudienceBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment AudienceBannerFragment on Audience {
    id
    bannerMedia {
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  audienceQuery: AudienceBannerFragment$key
}

export default function AudienceBanner (props: Props): JSX.Element {
  const {
    audienceQuery
  } = props

  const data = useFragment(Fragment, audienceQuery)

  if (data.bannerMedia == null) {
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
