import { useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import SetupPaxumAccountPayoutMethod from './SetupPaxumAccountPayoutMethod/SetupPaxumAccountPayoutMethod'
import { SetupPayoutMethodFragment$key } from '@//:artifacts/SetupPayoutMethodFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'

interface Props {
  query: SetupPayoutMethodFragment$key
}

const Fragment = graphql`
  fragment SetupPayoutMethodFragment on Account {
    ...SetupPaxumAccountPayoutMethodFragment
  }
`

export default function SetupPayoutMethod ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    values
  } = useChoiceContext()

  const currentPayoutMethod = Object.keys(values).length > 0 ? Object.keys(values)[0] : null

  switch (currentPayoutMethod) {
    case 'PAXUM':
      return <SetupPaxumAccountPayoutMethod query={data} />
    default:
      return <></>
  }
}
