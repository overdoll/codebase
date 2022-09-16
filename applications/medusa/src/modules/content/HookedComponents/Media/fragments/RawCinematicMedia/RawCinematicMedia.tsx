import { graphql } from 'react-relay'
import type { RawCinematicMediaFragment$key } from '@//:artifacts/RawCinematicMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ProcessingRawMedia from '../Media/ProcessingRawMedia/ProcessingRawMedia'
import CinematicMedia from '../CinematicMedia/CinematicMedia'
import { ObserveVideoContainerProps } from '../../components/ObserveVideoContainer/ObserveVideoContainer'

const Fragment = graphql`
  fragment RawCinematicMediaFragment on Media {
    __typename
    ...on RawMedia {
      ...ProcessingRawMediaFragment
    }
    ...CinematicMediaFragment
  }
`

interface Props extends ObserveVideoContainerProps {
  mediaQuery: RawCinematicMediaFragment$key
}

export default function RawCinematicMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    ...rest
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'RawMedia') {
    return <ProcessingRawMedia rawMediaQuery={data} />
  }

  return <CinematicMedia mediaQuery={data} {...rest} />
}
