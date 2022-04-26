import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountActiveClubSupporterSubscriptionDetailsFragment$key
} from '@//:artifacts/AccountActiveClubSupporterSubscriptionDetailsFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'

interface Props {
  query: AccountActiveClubSupporterSubscriptionDetailsFragment$key
}

const Fragment = graphql`
  fragment AccountActiveClubSupporterSubscriptionDetailsFragment on AccountActiveClubSupporterSubscription {
    supporterSince
    nextBillingDate
    club {
      id
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
      suspension {
        expires
      }
    }
  }
`

export default function AccountActiveClubSupporterSubscriptionDetails ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const nextBillingDate = format(new Date(data.nextBillingDate as Date), dateFormat, { locale })

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
        <HStack align='center' spacing={3}>
          <ResourceIcon
            seed={data?.club.id}
            h={10}
            w={10}
            query={data?.club.thumbnail}
          />
          <Heading
            isTruncated
            fontSize='2xl'
            color='gray.00'
          >
            {data?.club.name}
          </Heading>
          {data.club.suspension != null && <Icon icon={WarningTriangle} fill='orange.400' w={4} h={4} />}
        </HStack>
        <Badge borderRadius='base' fontSize='sm' colorScheme='green'>
          <Trans>
            ACTIVE
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
              Next renewal on
            </Trans>
          </Text>
          <Text {...descriptionProps}>
            {nextBillingDate}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  )
}
