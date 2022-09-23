import { graphql } from 'react-relay'
import type { PreviewVideoMediaFragment$key } from '@//:artifacts/PreviewVideoMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ContainersVideoMedia, { ContainersVideoMediaProps } from '../ContainersVideoMedia/ContainersVideoMedia'
import PosterImageMedia from '../PosterImageMedia/PosterImageMedia'
import BackgroundPosterImageMedia from '../BackgroundPosterImageMedia/BackgroundPosterImageMedia'

const Fragment = graphql`
  fragment PreviewVideoMediaFragment on VideoMedia {
    cover {
      ...BackgroundPosterImageMediaFragment
      ...PosterImageMediaFragment
    }
    aspectRatio {
      width
      height
    }
    ...ContainersVideoMediaFragment
  }
`

export interface PreviewVideoMediaProps {
  videoProps?: Omit<ContainersVideoMediaProps['videoProps'], 'controls' | 'poster' | 'backgroundPoster'>
  observerProps: Omit<ContainersVideoMediaProps['observerProps'], 'width' | 'height'>
}

interface Props extends PreviewVideoMediaProps {
  videoMediaQuery: PreviewVideoMediaFragment$key
}

export default function PreviewVideoMedia (props: Props): JSX.Element {
  const {
    videoMediaQuery,
    videoProps,
    observerProps
  } = props

  const data = useFragment(Fragment, videoMediaQuery)

  return (
    <ContainersVideoMedia
      videoMediaQuery={data}
      videoProps={{
        controls: 'simple',
        poster: <PosterImageMedia imageMediaQuery={data.cover} />,
        backgroundPoster: <BackgroundPosterImageMedia imageMediaQuery={data.cover} />,
        ...videoProps
      }}
      observerProps={{
        width: data?.aspectRatio?.width ?? 100,
        height: data?.aspectRatio?.height ?? 100,
        ...observerProps
      }}
    />
  )
}
