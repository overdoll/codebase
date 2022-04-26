import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPayoutsFragment$key } from '@//:artifacts/StaffClubPayoutsFragment.graphql'

interface Props {
  query: StaffClubPayoutsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPayoutsFragment on Club {
    id
  }
`

export default function StaffClubPayouts ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>club payouts</>
  )
}
