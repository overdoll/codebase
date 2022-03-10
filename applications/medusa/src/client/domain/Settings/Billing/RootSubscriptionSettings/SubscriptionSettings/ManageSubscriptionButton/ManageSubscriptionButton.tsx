import { graphql, useFragment } from 'react-relay/hooks'
import type { ManageSubscriptionButtonFragment$key } from '@//:artifacts/ManageSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Plural, t, Trans } from '@lingui/macro'
import CancelSubscriptionButton from './CancelSubscriptionButton/CancelSubscriptionButton'
import differenceInDays from 'date-fns/differenceInDays'
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { ArrowButtonDown, InfoCircle } from '@//:assets/icons'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'
import UpdatePaymentMethodButton from './UpdatePaymentMethodButton/UpdatePaymentMethodButton'

interface Props {
  query: ManageSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ManageSubscriptionButtonFragment on AccountClubSupporterSubscription {
    nextBillingDate
    status
    ...CancelSubscriptionButtonFragment
    ...UpdatePaymentMethodButtonFragment
  }
`

export default function ManageSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const cancelledRemainingDays = differenceInDays(new Date(data.nextBillingDate as Date), new Date())

  if (data.status === 'ACTIVE') {
    return (
      <Box>
        <Menu placement='bottom-end' autoSelect={false}>
          <MenuButton
            w='100%'
            size='md'
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
            <CancelSubscriptionButton query={data} />
          </MenuList>
        </Menu>
      </Box>
    )
  }

  return (
    <HStack spacing={2} justify='space-between'>
      <Button w='100%' size='md' variant='solid' colorScheme='gray' isDisabled>
        <Plural
          value={cancelledRemainingDays}
          one='Benefits expire in # day'
          other='Benefits expire in # days'
        />
      </Button>
      <Box>
        <Popover placement='bottom-end'>
          <PopoverTrigger>
            <IconButton
              icon={<Icon icon={InfoCircle} fill='gray.100' w={4} h={4} />}
              aria-label={i18n._(t`Info`)}
              size='md'
              variant='solid'
              colorScheme='gray'
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Text fontSize='sm' color='gray.100'>
                <Plural
                  value={cancelledRemainingDays}
                  one='Your benefits will expire in # day.'
                  other='Your benefits will expire in # days.'
                />
              </Text>
              <Text fontSize='sm' color='gray.100'>
                <Trans>
                  You can renew your benefits only after the
                  subscription has fully expired from the club page.
                </Trans>
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </HStack>
  )
}
