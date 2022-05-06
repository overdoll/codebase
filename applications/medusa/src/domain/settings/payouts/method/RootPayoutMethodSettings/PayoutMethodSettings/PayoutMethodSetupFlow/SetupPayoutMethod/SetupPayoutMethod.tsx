import { useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import SetupPaxumAccountPayoutMethod from './SetupPaxumAccountPayoutMethod/SetupPaxumAccountPayoutMethod'

export default function SetupPayoutMethod (): JSX.Element {
  const {
    values
  } = useChoiceContext()

  const currentPayoutMethod = Object.keys(values).length > 0 ? Object.keys(values)[0] : null

  switch (currentPayoutMethod) {
    case 'PAXUM':
      return <SetupPaxumAccountPayoutMethod />
    default:
      return <></>
  }
}
