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
        targetDevice
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

  const getHlsUrls = data.containers.reduce((accum, item) => {
    if (item.__typename !== 'HLSVideoContainer') {
      return accum
    }
    return ({
      ...accum,
      ...(item.targetDevice === 'DESKTOP' && { desktop: item.url }),
      ...(item.targetDevice === 'UNIVERSAL' && { universal: item.url }),
      ...(item.targetDevice === 'MOBILE' && { mobile: item.url })
    })
  }, {})

  const getMp4Url = data.containers.reduce((accum, item) => {
    if (item.__typename !== 'MP4VideoContainer') {
      return accum
    }
    return item.url
  }, null)

  return (
    <ObserveVideoContainer
      videoProps={{
        mp4Url: getMp4Url ?? undefined,
        hlsUrls: getHlsUrls,
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
