import { graphql, usePaginationFragment } from 'react-relay'
import { ClubListSelectorFragment$key } from '@//:artifacts/ClubListSelectorFragment.graphql'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  SingleSelector,
  useSingleSelector
} from '../../../../../../modules/content/ContentSelection'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import ClubTileOverlay
  from '../../../../../../modules/content/ContentSelection/components/TileOverlay/ClubTileOverlay/ClubTileOverlay'

interface Props {
  query: ClubListSelectorFragment$key | null
  onChange: (id) => void
  initialSelection?: string | null
}

const Fragment = graphql`
  fragment ClubListSelectorFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ClubListSelectorPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ClubListSelector_clubs")
    {
      edges {
        node {
          slug
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function ClubListSelector ({
  query,
  onChange,
  initialSelection = null
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SelectClubsQuery, any>(
    Fragment,
    query
  )

  const [currentSelection, setCurrentSelection] = useSingleSelector({ defaultValue: initialSelection })

  const onSelect = (id): void => {
    onChange(id)
    if (currentSelection === id) return
    setCurrentSelection(id)
  }

  return (
    <GridWrap>
      {data.clubs.edges.map((item, index) => (
        <GridTile key={index}>
          <SingleSelector
            onSelect={onSelect}
            selected={(currentSelection != null) ? [currentSelection] : []}
            id={item.node.slug}
          >
            <ClubTileOverlay query={item.node} />
          </SingleSelector>
        </GridTile>
      )
      )}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(3)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
