import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubPaymentsFragment$key } from '@//:artifacts/StaffClubPaymentsFragment.graphql'

interface Props {
  query: StaffClubPaymentsFragment$key
}

const Fragment = graphql`
  fragment StaffClubPaymentsFragment on Club {
    id
  }
`

export default function StaffClubPayments ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>club payments</>
  )
}
