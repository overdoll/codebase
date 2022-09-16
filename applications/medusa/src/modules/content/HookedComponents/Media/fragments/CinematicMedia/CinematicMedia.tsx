import { graphql } from 'react-relay'
import type { CinematicMediaFragment$key } from '@//:artifacts/CinematicMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CinematicImageMedia from '../Media/CinematicImageMedia/CinematicImageMedia'
import CinematicVideoMedia from '../Media/CinematicVideoMedia/CinematicVideoMedia'
import { ObserveVideoContainerProps } from '../../components/ObserveVideoContainer/ObserveVideoContainer'
import { VideoContainerProps } from '../../components/VideoContainer/VideoContainer'

const Fragment = graphql`
  fragment CinematicMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...CinematicImageMediaFragment
    }
    ...on VideoMedia {
      ...CinematicVideoMediaFragment
    }
  }
`

interface Props extends ObserveVideoContainerProps, Partial<Pick<VideoContainerProps, 'currentTime' | 'autoPlay'>> {
  mediaQuery: CinematicMediaFragment$key
}

export default function CinematicMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    ...rest
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'ImageMedia') {
    return (
      <CinematicImageMedia imageMediaQuery={data} />
    )
  }

  if (data?.__typename === 'VideoMedia') {
    return (
      <CinematicVideoMedia videoMediaQuery={data} {...rest} />
    )
  }

  return <></>
}
