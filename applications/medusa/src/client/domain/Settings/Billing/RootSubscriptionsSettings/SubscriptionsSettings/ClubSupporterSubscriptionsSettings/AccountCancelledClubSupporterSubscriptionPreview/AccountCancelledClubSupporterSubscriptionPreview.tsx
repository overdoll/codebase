import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountCancelledClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/AccountCancelledClubSupporterSubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox, ResourceIcon } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { LinkTile } from '@//:modules/content/ContentSelection'
import ManageCancelledSubscriptionButton from './ManageCancelledSubscriptionButton/ManageCancelledSubscriptionButton'

interface Props {
  query: AccountCancelledClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment AccountCancelledClubSupporterSubscriptionPreviewFragment on AccountCancelledClubSupporterSubscription {
    supporterSince
    cancelledAt
    club {
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
    }
    ...ManageCancelledSubscriptionButtonFragment
  }
`

export default function AccountCancelledClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
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
    <LargeBackgroundBox w='100%'>
      <Stack spacing={4}>
        <HStack spacing={2} justify='space-between'>
          <LinkTile to={`/${data.club.slug}`}>
            <HStack spacing={3}>
              <ResourceIcon h={10} w={10} query={data?.club.thumbnail} />
              <Heading
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                overflow='hidden'
                fontSize='2xl'
                color='gray.00'
              >
                {data?.club.name}
              </Heading>
            </HStack>
          </LinkTile>
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
              <Trans>
                {cancelledAt}
              </Trans>
            </Text>
          </HStack>
        </Stack>
        <ManageCancelledSubscriptionButton query={data} />
      </Stack>
    </LargeBackgroundBox>
  )
}
