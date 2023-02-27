import { SuggestedHomeFragment$key } from '@//:artifacts/SuggestedHomeFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import RecommendedPostsGrid from './RecommendedPostsGrid/RecommendedPostsGrid'

interface Props {
  rootQuery: SuggestedHomeFragment$key
}

const Fragment = graphql`
  fragment SuggestedHomeFragment on Query {
    ...RecommendedPostsGridFragment
  }
`

export default function SuggestedHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <RecommendedPostsGrid rootQuery={data} />
  )
}
