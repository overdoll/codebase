import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollPublicClubCharacterFragment$key } from '@//:artifacts/ScrollPublicClubCharacterFragment.graphql'
import { ResultPublicClubCharacterQuery } from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  characterQuery: ScrollPublicClubCharacterFragment$key
}

const Fragment = graphql`
  fragment ScrollPublicClubCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "PublicClubCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "PublicClubCharacterPosts_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubCharacterQuery, any>(
    Fragment,
    characterQuery
  )

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.posts?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
