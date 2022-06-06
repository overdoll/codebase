import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ManageCancelledSubscriptionButtonFragment$key
} from '@//:artifacts/ManageCancelledSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Plural, t, Trans } from '@lingui/macro'
import differenceInDays from 'date-fns/differenceInDays'
import { Box, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { InfoCircle } from '@//:assets/icons'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'

interface Props {
  query: ManageCancelledSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ManageCancelledSubscriptionButtonFragment on AccountCancelledClubSupporterSubscription {
    endDate
  }
`

export default function ManageCancelledSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const cancelledRemainingDays = differenceInDays(new Date(data.endDate as Date), new Date())

  return (
    <HStack spacing={2} justify='space-between'>
      <Button w='100%' size='lg' variant='solid' colorScheme='gray' isDisabled>
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
              size='lg'
              variant='solid'
              colorScheme='gray'
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody fontSize='sm'>
              <Plural
                value={cancelledRemainingDays}
                one='Your benefits will expire in # day.'
                other='Your benefits will expire in # days.'
              />
              <Trans>
                You can renew your benefits only after the
                subscription has fully expired from the club page.
              </Trans>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </HStack>
  )
}
