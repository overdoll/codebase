import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountCancelledClubSupporterSubscriptionDetailsFragment$key
} from '@//:artifacts/AccountCancelledClubSupporterSubscriptionDetailsFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface Props {
  query: AccountCancelledClubSupporterSubscriptionDetailsFragment$key
}

const Fragment = graphql`
  fragment AccountCancelledClubSupporterSubscriptionDetailsFragment on AccountCancelledClubSupporterSubscription {
    supporterSince
    cancelledAt
    club {
      id
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function AccountCancelledClubSupporterSubscriptionDetails ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const cancelledAt = format(new Date(data.cancelledAt != null && data.cancelledAt), dateFormat, { locale })

  const headerProps = {
    color: 'gray.100',
    fontSize: 'md'
  }

  const descriptionProps = {
    color: 'gray.100',
    fontSize: 'md',
    fontWeight: 'semibold'
  }

  return (
    <Stack w='100%' spacing={2}>
      <HStack spacing={2} justify='space-between'>
        <HStack spacing={3}>
          <ResourceIcon
            showBorder
            seed={data?.club.id}
            h={10}
            w={10}
            query={data?.club.thumbnail}
          />
          <Heading
            noOfLines={1}
            fontSize='2xl'
            color='gray.00'
          >
            {data?.club.name}
          </Heading>
        </HStack>
        <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
          <Trans>
            CANCELLED
          </Trans>
        </Badge>
      </HStack>
      <Stack spacing={2}>
        <HStack spacing={2}>
          <Text {...headerProps}>
            <Trans>
              Supporter since
            </Trans>
          </Text>
          <Text {...descriptionProps}>
            {supporterSince}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Text {...headerProps}>
            <Trans>
              Cancelled on
            </Trans>
          </Text>
          <Text {...descriptionProps}>
            {cancelledAt}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  )
}
