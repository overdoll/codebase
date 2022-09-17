import { graphql } from 'react-relay'
import type { ContainersVideoMediaFragment$key } from '@//:artifacts/ContainersVideoMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ObserveVideoContainer, {
  ObserveVideoContainerProps
} from '../../../components/ObserveVideoContainer/ObserveVideoContainer'
import { CinematicImageMediaProps } from '../CinematicImageMedia/CinematicImageMedia'

const Fragment = graphql`
  fragment ContainersVideoMediaFragment on VideoMedia {
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

export interface ContainersVideoMediaProps extends Omit<ObserveVideoContainerProps, 'videoProps'>, CinematicImageMediaProps {
  videoProps: Omit<ObserveVideoContainerProps['videoProps'], 'hlsUrl' | 'mp4Url' | 'aspectRatio' | 'duration' | 'hasAudio'>
}

interface Props extends ContainersVideoMediaProps {
  videoMediaQuery: ContainersVideoMediaFragment$key
}

export default function ContainersVideoMedia (props: Props): JSX.Element {
  const {
    videoMediaQuery,
    videoProps,
    imageProps,
    ...rest
  } = props

  const data = useFragment(Fragment, videoMediaQuery)

  const urls = data.containers.map(item => item.__typename === 'HLSVideoContainer' ? ({ hlsUrl: item.url }) : (item.__typename === 'MP4VideoContainer' ? ({ mp4Url: item.url }) : ({})))

  const hlsUrl = urls.filter((item) => item.hlsUrl != null)?.[0].hlsUrl
  const mp4Url = urls.filter((item) => item.mp4Url != null)?.[0].mp4Url

  if (hlsUrl != null) {
    return (
      <ObserveVideoContainer
        videoProps={{
          hlsUrl: hlsUrl,
          aspectRatio: {
            width: data.aspectRatio.width,
            height: data.aspectRatio.height
          },
          duration: data.duration / 1000,
          hasAudio: data.hasAudio,
          ...videoProps
        }}
        {...rest}
      />
    )
  }

  if (mp4Url != null) {
    return (
      <ObserveVideoContainer
        videoProps={{
          mp4Url: mp4Url,
          aspectRatio: {
            width: data.aspectRatio.width,
            height: data.aspectRatio.height
          },
          duration: data.duration / 1000,
          hasAudio: data.hasAudio,
          ...videoProps
        }}
        {...rest}
      />
    )
  }

  return (
    <></>
  )
}
