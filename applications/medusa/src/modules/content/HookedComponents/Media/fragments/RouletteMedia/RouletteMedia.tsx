import { graphql } from 'react-relay'
import type { RouletteMediaFragment$key } from '@//:artifacts/RouletteMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CinematicImageMedia from '../Media/CinematicImageMedia/CinematicImageMedia'
import RouletteVideoMedia, { RouletteVideoMediaProps } from '../Media/RouletteVideoMedia/RouletteVideoMedia'

const Fragment = graphql`
  fragment RouletteMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...CinematicImageMediaFragment
    }
    ...on VideoMedia {
      ...RouletteVideoMediaFragment
    }
  }
`

interface Props extends RouletteVideoMediaProps {
  mediaQuery: RouletteMediaFragment$key
}

export default function RouletteMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    observerProps
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'ImageMedia') {
    return (
      <CinematicImageMedia
        imageMediaQuery={data}
      />
    )
  }

  if (data?.__typename === 'VideoMedia') {
    return (
      <RouletteVideoMedia
        videoMediaQuery={data}
        observerProps={observerProps}
      />
    )
  }

  return <></>
}
