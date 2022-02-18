import { graphql, usePaginationFragment } from 'react-relay'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { ClubListSelectorQuery } from '@//:artifacts/ClubListSelectorQuery.graphql'
import ClubTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/ClubTileOverlay/ClubTileOverlay'
import generatePath from '@//:modules/routing/generatePath'
import { useHistory, useParams } from '@//:modules/routing'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import EmptyClubs from '@//:modules/content/Placeholder/Empty/EmptyClubs/EmptyClubs'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'

const Query = graphql`
  query ClubListSelectorQuery {
    viewer {
      ...ClubListSelectorFragment
    }
  }
`

interface Props {
  onClose: () => void
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

export default function ClubListSelector ({ onClose }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<ClubListSelectorQuery>(Query, {})

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<ClubListSelectorQuery, any>(
    Fragment,
    queryData?.viewer
  )

  const params = useParams()

  const history = useHistory()

  const onChange = (id): void => {
    const newPath = generatePath('/club/:slug/:entity', {
      slug: id,
      entity: params.entity
    })
    history.push(newPath)
    onClose()
  }

  const {
    register
  } = useChoice<{}>({
    defaultValue: {
      [params.slug as string]: {}
    },
    max: 1,
    onChoice: (id) => onChange(id)
  })

  return (
    <EmptyBoundary
      fallback={<EmptyClubs />}
      condition={data.clubs.edges.length < 1}
    >
      <GridWrap>
        {data.clubs.edges.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.node.slug, {})}>
              <ClubTileOverlay query={item.node} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(3)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
