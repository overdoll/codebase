import { graphql, useFragment } from 'react-relay/hooks'
import { ShowRouletteSessionFragment$key } from '@//:artifacts/ShowRouletteSessionFragment.graphql'
import RouletteSessionScreen from './RouletteSessionScreen/RouletteSessionScreen'
import RouletteSessionFooter from './RouletteSessionFooter/RouletteSessionFooter'
import RouletteSubtitleTrack from './RouletteSessionScreen/RouletteSubtitleTrack/RouletteSubtitleTrack'

interface Props {
  query: ShowRouletteSessionFragment$key | null
}

const Fragment = graphql`
  fragment ShowRouletteSessionFragment on GameSessionStatus {
    ...RouletteSessionFooterFragment
    ...RouletteSessionScreenFragment
    ...RouletteSubtitleTrackFragment
  }
`

export default function ShowRouletteSession (props: Props): JSX.Element {
  const {
    query

  } = props

  const data = useFragment(Fragment, query)

  return (
    <>
      <RouletteSessionScreen query={data} />
      <RouletteSubtitleTrack query={data} />
      <RouletteSessionFooter query={data} />
    </>
  )
}
