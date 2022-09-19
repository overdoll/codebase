import { graphql } from 'react-relay'
import type { TopicBannerFragment$key } from '@//:artifacts/TopicBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment TopicBannerFragment on Topic {
    id
    bannerMedia {
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  topicQuery: TopicBannerFragment$key
}

export default function TopicBanner (props: Props): JSX.Element {
  const {
    topicQuery
  } = props

  const data = useFragment(Fragment, topicQuery)

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
