import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Wrap } from '@chakra-ui/react'
import { ClubSupportLinksFragment$key } from '@//:artifacts/ClubSupportLinksFragment.graphql'
import ClubSupportTile from './ClubSupportTile/ClubSupportTile'

interface Props {
  rootQuery: ClubSupportLinksFragment$key
}

const RootFragment = graphql`
  fragment ClubSupportLinksFragment on Query {
    viewer {
      ...ClubSupportTileAccountFragment
    }
    clubs(canSupport: true, first: 20) {
      edges {
        node {
          id
          ...ClubSupportTileClubFragment
        }
      }
    }
  }
`

export default function ClubSupportLinks (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <Wrap justify='center'>
      {rootData.clubs.edges.map((item) => (
        <ClubSupportTile
          key={item.node.id}
          accountQuery={rootData.viewer}
          clubQuery={item.node}
        />))}
    </Wrap>
  )
}
