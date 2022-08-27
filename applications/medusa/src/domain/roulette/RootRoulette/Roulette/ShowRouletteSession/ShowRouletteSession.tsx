import { graphql, useFragment } from 'react-relay/hooks'
import { ShowRouletteSessionFragment$key } from '@//:artifacts/ShowRouletteSessionFragment.graphql'
import { ShowRouletteSessionViewerFragment$key } from '@//:artifacts/ShowRouletteSessionViewerFragment.graphql'
import { GridItem } from '@chakra-ui/react'
import RouletteSessionScreen from './RouletteSessionScreen/RouletteSessionScreen'
import RouletteSessionFooter from './RouletteSessionFooter/RouletteSessionFooter'
import RouletteSubtitleTrack from './RouletteSessionScreen/RouletteSubtitleTrack/RouletteSubtitleTrack'

interface Props {
  query: ShowRouletteSessionFragment$key
  viewerQuery: ShowRouletteSessionViewerFragment$key | null
}

const Fragment = graphql`
  fragment ShowRouletteSessionFragment on RouletteStatus {
    ...RouletteSessionFooterFragment
    ...RouletteSessionScreenFragment
    ...RouletteSubtitleTrackFragment
  }
`

const ViewerFragment = graphql`
  fragment ShowRouletteSessionViewerFragment on Account {
    ...RouletteSessionScreenViewerFragment
  }
`

export default function ShowRouletteSession (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <RouletteSubtitleTrack query={data} />
      <RouletteSessionScreen query={data} viewerQuery={viewerData} />
      <GridItem>
        <RouletteSessionFooter query={data} />
      </GridItem>
    </>
  )
}
