import { graphql } from 'react-relay'
import type { RouletteVideoMediaFragment$key } from '@//:artifacts/RouletteVideoMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ContainersVideoMedia, { ContainersVideoMediaProps } from '../ContainersVideoMedia/ContainersVideoMedia'
import PosterImageMedia from '../PosterImageMedia/PosterImageMedia'

const Fragment = graphql`
  fragment RouletteVideoMediaFragment on VideoMedia {
    cover {
      ...PosterImageMediaFragment
    }
    ...ContainersVideoMediaFragment
  }
`

export interface RouletteVideoMediaProps {
  observerProps: Omit<ContainersVideoMediaProps['observerProps'], 'threshold'>
}

interface Props extends RouletteVideoMediaProps {
  videoMediaQuery: RouletteVideoMediaFragment$key
}

export default function RouletteVideoMedia (props: Props): JSX.Element {
  const {
    videoMediaQuery,
    observerProps
  } = props

  const data = useFragment(Fragment, videoMediaQuery)

  return (
    <ContainersVideoMedia
      videoMediaQuery={data}
      videoProps={{
        controls: 'advanced',
        poster: <PosterImageMedia imageMediaQuery={data.cover} />
      }}
      observerProps={{
        threshold: 0,
        ...observerProps
      }}
    />
  )
}
