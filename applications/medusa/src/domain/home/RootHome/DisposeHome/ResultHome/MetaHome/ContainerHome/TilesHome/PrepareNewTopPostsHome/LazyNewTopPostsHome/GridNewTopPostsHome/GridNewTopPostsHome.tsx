import type { GridNewTopPostsHomeFragment$key } from '@//:artifacts/GridNewTopPostsHomeFragment.graphql'
import { graphql } from 'react-relay'
import { Stack } from '@chakra-ui/react'
import GridTopNewPosts from '../../../fragments/GridTopNewPosts/GridTopNewPosts'
import { useFragment } from 'react-relay/hooks'
import GridSeriesCharactersCategories
  from '../../../fragments/GridSeriesCharactersCategories/GridSeriesCharactersCategories'

interface Props {
  rootQuery: GridNewTopPostsHomeFragment$key
}

const RootFragment = graphql`
  fragment GridNewTopPostsHomeFragment on Query {
    ...GridTopNewPostsFragment
    ...GridSeriesCharactersCategoriesFragment
  }
`

export default function GridNewTopPostsHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(
    RootFragment,
    rootQuery
  )

  return (
    <Stack overflowX='scroll' spacing={1}>
      <GridTopNewPosts rootQuery={data} />
      <GridSeriesCharactersCategories rootQuery={data} />
    </Stack>
  )
}
