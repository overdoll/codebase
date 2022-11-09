import { graphql } from 'react-relay'
import { ClubHeaderFragment$key } from '@//:artifacts/ClubHeaderFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ClubHeaderMedia from './ClubHeaderMedia/ClubHeaderMedia'

const Fragment = graphql`
  fragment ClubHeaderFragment on Club {
    id
    header {
      __typename
      ...ClubHeaderMediaFragment
    }
  }
`

interface Props {
  clubQuery: ClubHeaderFragment$key
}

export default function ClubHeader (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const data = useFragment(Fragment, clubQuery)

  if (data.header == null || data.header.__typename === 'RawMedia') {
    return (
      <></>
    )
  }

  return (
    <ClubHeaderMedia mediaQuery={data.header} />
  )
}
