import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ManageSavedPaymentMethodButtonFragment$key
} from '@//:artifacts/ManageSavedPaymentMethodButtonFragment.graphql'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import DeleteSavedPaymentMethodButton from './DeleteSavedPaymentMethodButton/DeleteSavedPaymentMethodButton'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: ManageSavedPaymentMethodButtonFragment$key
}

const Fragment = graphql`
  fragment ManageSavedPaymentMethodButtonFragment on AccountSavedPaymentMethod {
    ...DeleteSavedPaymentMethodButtonFragment
  }
`

export default function ManageSavedPaymentMethodButton ({ query, connectionId }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Menu
      variant='ghost'
      size='xs'
      color='gray.100'
    >
      <DeleteSavedPaymentMethodButton connectionId={connectionId} query={data} />
    </Menu>
  )
}
