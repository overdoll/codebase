import { graphql } from 'react-relay'
import type { PreviewVideoMediaFragment$key } from '@//:artifacts/PreviewVideoMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import BackgroundPosterImageMedia from '../BackgroundPosterImageMedia/BackgroundPosterImageMedia'
import PosterImageMedia from '../PosterImageMedia/PosterImageMedia'
import ObserveVideoContainer, {
  ObserveVideoContainerProps
} from '../../../components/ObserveVideoContainer/ObserveVideoContainer'
import { VideoContainerProps } from '../../../components/VideoContainer/VideoContainer'

const Fragment = graphql`
  fragment PreviewVideoMediaFragment on VideoMedia {
    cover {
      ...BackgroundPosterImageMediaFragment
      ...PosterImageMediaFragment
    }
    aspectRatio {
      height
      width
    }
    duration
    hasAudio
    containers {
      __typename
      ...on HLSVideoContainer {
        url
      }
      ...on MP4VideoContainer {
        url
      }
    }
  }
`

interface Props extends ObserveVideoContainerProps, Partial<Pick<VideoContainerProps, 'currentTime'>> {
  videoMediaQuery: PreviewVideoMediaFragment$key
}

export default function PreviewVideoMedia (props: Props): JSX.Element {
  const {
    videoMediaQuery,
    ...rest
  } = props

  const data = useFragment(Fragment, videoMediaQuery)

  const urls = data.containers.map(item => item.__typename === 'HLSVideoContainer' ? ({ hlsUrl: item.url }) : (item.__typename === 'MP4VideoContainer' ? ({ mp4Url: item.url }) : ({})))

  const hlsUrl = urls.filter((item) => item.hlsUrl != null)?.[0].hlsUrl
  const mp4Url = urls.filter((item) => item.mp4Url != null)?.[0].mp4Url

  // TODO video containers need to be wrapped in managers that control autoplay

  if (hlsUrl != null) {
    return (
      <ObserveVideoContainer
        hlsUrl={hlsUrl}
        poster={<PosterImageMedia imageMediaQuery={data.cover} />}
        backgroundPoster={<BackgroundPosterImageMedia imageMediaQuery={data.cover} />}
        aspectRatio={{
          width: data.aspectRatio.width,
          height: data.aspectRatio.height
        }}
        duration={data.duration / 1000}
        hasAudio={data.hasAudio}
        controls='simple'
        {...rest}
      />
    )
  }

  if (mp4Url != null) {
    return (
      <ObserveVideoContainer
        mp4Url={mp4Url}
        poster={<BackgroundPosterImageMedia imageMediaQuery={data.cover} />}
        backgroundPoster={<BackgroundPosterImageMedia imageMediaQuery={data.cover} />}
        aspectRatio={{
          width: data.aspectRatio.width,
          height: data.aspectRatio.height
        }}
        duration={data.duration / 1000}
        hasAudio={data.hasAudio}
        controls='simple'
        {...rest}
      />
    )
  }

  return (
    <></>
  )
}
