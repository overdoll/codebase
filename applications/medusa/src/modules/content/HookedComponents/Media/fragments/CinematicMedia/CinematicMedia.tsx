import { graphql } from 'react-relay'
import type { CinematicMediaFragment$key } from '@//:artifacts/CinematicMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CinematicImageMedia, { CinematicImageMediaProps } from '../Media/CinematicImageMedia/CinematicImageMedia'
import CinematicVideoMedia, { CinematicVideoMediaProps } from '../Media/CinematicVideoMedia/CinematicVideoMedia'

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

interface Props extends CinematicVideoMediaProps, CinematicImageMediaProps {
  mediaQuery: CinematicMediaFragment$key
}

export default function CinematicMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    imageProps,
    videoProps,
    observerProps
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'ImageMedia') {
    return (
      <CinematicImageMedia
        imageMediaQuery={data}
        imageProps={imageProps}
      />
    )
  }

  if (data?.__typename === 'VideoMedia') {
    return (
      <CinematicVideoMedia
        videoMediaQuery={data}
        imageProps={imageProps}
        videoProps={videoProps}
        observerProps={observerProps}
      />
    )
  }

  return <></>
}
