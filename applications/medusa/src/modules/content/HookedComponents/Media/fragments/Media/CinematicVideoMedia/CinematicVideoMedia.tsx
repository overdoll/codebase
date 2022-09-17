import { graphql } from 'react-relay'
import type { CinematicVideoMediaFragment$key } from '@//:artifacts/CinematicVideoMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ContainersVideoMedia, { ContainersVideoMediaProps } from '../ContainersVideoMedia/ContainersVideoMedia'
import { CinematicImageMediaProps } from '../CinematicImageMedia/CinematicImageMedia'
import PosterImageMedia from '../PosterImageMedia/PosterImageMedia'
import BackgroundPosterImageMedia from '../BackgroundPosterImageMedia/BackgroundPosterImageMedia'

const Fragment = graphql`
  fragment CinematicVideoMediaFragment on VideoMedia {
    cover {
      ...BackgroundPosterImageMediaFragment
      ...PosterImageMediaFragment
    }
    ...ContainersVideoMediaFragment
  }
`

export interface CinematicVideoMediaProps extends CinematicImageMediaProps {
  videoProps?: Omit<ContainersVideoMediaProps['videoProps'], 'controls' | 'poster' | 'backgroundPoster'>
  observerProps: Omit<ContainersVideoMediaProps['observerProps'], 'threshold'>
}

interface Props extends CinematicVideoMediaProps {
  videoMediaQuery: CinematicVideoMediaFragment$key
}

export default function CinematicVideoMedia (props: Props): JSX.Element {
  const {
    videoMediaQuery,
    videoProps,
    observerProps,
    imageProps
  } = props

  const data = useFragment(Fragment, videoMediaQuery)

  return (
    <ContainersVideoMedia
      videoMediaQuery={data}
      videoProps={{
        controls: 'advanced',
        poster: <PosterImageMedia imageMediaQuery={data.cover} imageProps={imageProps} />,
        backgroundPoster: <BackgroundPosterImageMedia imageMediaQuery={data.cover} imageProps={imageProps} />,
        ...videoProps
      }}
      observerProps={{
        threshold: 0,
        ...observerProps
      }}
      imageProps={imageProps}
    />
  )
}
