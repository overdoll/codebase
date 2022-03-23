import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountActiveClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/AccountActiveClubSupporterSubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox, ResourceIcon } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import ManageActiveSubscriptionButton from './ManageActiveSubscriptionButton/ManageActiveSubscriptionButton'
import { LinkTile, StackTile } from '@//:modules/content/ContentSelection'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: AccountActiveClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment AccountActiveClubSupporterSubscriptionPreviewFragment on AccountActiveClubSupporterSubscription {
    supporterSince
    nextBillingDate
    club {
      name
      slug
      thumbnail {
        ...ResourceIconFragment
      }
    }
    ...ManageActiveSubscriptionButtonFragment
  }
`

export default function AccountActiveClubSupporterSubscriptionPreview ({
  query,
  connectionId
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
    <StackTile>
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
          <ManageActiveSubscriptionButton connectionId={connectionId} query={data} />
        </Stack>
      </LargeBackgroundBox>
    </StackTile>
  )
}
