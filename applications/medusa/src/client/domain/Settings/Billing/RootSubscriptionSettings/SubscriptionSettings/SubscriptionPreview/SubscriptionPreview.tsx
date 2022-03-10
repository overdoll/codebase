import { graphql, useFragment } from 'react-relay/hooks'
import type { SubscriptionPreviewFragment$key } from '@//:artifacts/SubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox, ResourceIcon } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormatWithTime, dateFormat } from '@//:modules/constants/format'

import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import ManageSubscriptionButton from '../ManageSubscriptionButton/ManageSubscriptionButton'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: SubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment SubscriptionPreviewFragment on AccountClubSupporterSubscription {
    supporterSince
    lastBillingDate
    cancelledAt
    nextBillingDate
    status
    club {
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
    }
    ...ManageSubscriptionButtonFragment
  }
`

export default function SubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const cancelledAt = format(new Date(data.cancelledAt != null && data.cancelledAt), dateFormat, { locale })
  const nextBillingDate = format(new Date(data.nextBillingDate as Date), dateFormatWithTime, { locale })

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
          <Badge borderRadius='base' fontSize='sm' colorScheme={data.status === 'ACTIVE' ? 'green' : 'orange'}>
            {data.status}
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
          {data.status === 'ACTIVE'
            ? (
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
              )
            : (
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
              )}
        </Stack>
        <ManageSubscriptionButton query={data} />
      </Stack>
    </LargeBackgroundBox>
  )
}
