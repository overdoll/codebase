import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ManageActiveSubscriptionButtonFragment$key
} from '@//:artifacts/ManageActiveSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import CancelSubscriptionButton from './CancelSubscriptionButton/CancelSubscriptionButton'
import { Box, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ArrowButtonDown } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import UpdatePaymentMethodButton from './UpdatePaymentMethodButton/UpdatePaymentMethodButton'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: ManageActiveSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ManageActiveSubscriptionButtonFragment on AccountActiveClubSupporterSubscription {
    ...CancelSubscriptionButtonFragment
    ...UpdatePaymentMethodButtonFragment
  }
`

export default function ManageActiveSubscriptionButton ({
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box>
      <Menu placement='bottom-end' autoSelect={false}>
        <MenuButton
          w='100%'
          size='lg'
          colorScheme='gray'
          as={Button}
          rightIcon={<Icon icon={ArrowButtonDown} fill='gray.100' w={3} h={3} />}
        >
          <Trans>
            Manage Subscription
          </Trans>
        </MenuButton>
        <MenuList minW='230px' boxShadow='outline'>
          <UpdatePaymentMethodButton query={data} />
          <CancelSubscriptionButton connectionId={connectionId} query={data} />
        </MenuList>
      </Menu>
    </Box>
  )
}
