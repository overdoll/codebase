import { SecondarySuggestedHomeFragment$key } from '@//:artifacts/SecondarySuggestedHomeFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import DiscoverClubsTiles from './DiscoverClubsTiles/DiscoverClubsTiles'
import PopularTagsCards from './PopularTagsCards/PopularTagsCards'

interface Props {
  rootQuery: SecondarySuggestedHomeFragment$key
}

const Fragment = graphql`
  fragment SecondarySuggestedHomeFragment on Query {
    ...PopularTagsCardsFragment
    ...DiscoverClubsTilesFragment
  }
`

export default function SecondarySuggestedHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <PopularTagsCards rootQuery={data} />
      <DiscoverClubsTiles rootQuery={data} />
    </>

  )
}
