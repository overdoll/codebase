import { graphql, useFragment } from 'react-relay/hooks'
import type { ManageSubscriptionButtonFragment$key } from '@//:artifacts/ManageSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import CancelSubscriptionButton from './CancelSubscriptionButton/CancelSubscriptionButton'
import differenceInDays from 'date-fns/differenceInDays'
import { Box, Menu, MenuButton, MenuList } from '@chakra-ui/react'

interface Props {
  query: ManageSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ManageSubscriptionButtonFragment on AccountClubSupporterSubscription {
    nextBillingDate
    status
    ...CancelSubscriptionButtonFragment
  }
`

export default function ManageSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const cancelledRemainingDays = differenceInDays(new Date(data.nextBillingDate as Date), new Date())

  if (data.status === 'ACTIVE') {
    return (
      <Box>
        <Menu autoSelect={false}>
          <MenuButton
            w='100%'
            size='md'
            colorScheme='gray'
            as={Button}
          >
            <Trans>
              Manage Subscription
            </Trans>
          </MenuButton>
          <MenuList minW='230px' boxShadow='outline'>
            <CancelSubscriptionButton query={data} />
          </MenuList>
        </Menu>
      </Box>
    )
  }

  return (
    <Button size='md' variant='solid' colorScheme='gray' isDisabled>
      <Trans>
        Benefits expire in {cancelledRemainingDays} days
      </Trans>
    </Button>
  )
}
