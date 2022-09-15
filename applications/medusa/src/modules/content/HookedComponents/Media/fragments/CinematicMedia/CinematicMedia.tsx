import { graphql } from 'react-relay'
import type { CinematicMediaFragment$key } from '@//:artifacts/CinematicMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CinematicImageMedia from '../Media/CinematicImageMedia/CinematicImageMedia'
import CinematicVideoMedia from '../Media/CinematicVideoMedia/CinematicVideoMedia'

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

interface Props {
  mediaQuery: CinematicMediaFragment$key
}

export default function CinematicMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <CinematicImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <CinematicVideoMedia videoMediaQuery={data} />
    )
  }

  return <></>
}
