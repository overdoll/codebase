import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ExpiredAccountClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/ExpiredAccountClubSupporterSubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Badge, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { LinkTile } from '@//:modules/content/ContentSelection'
import ManageExpiredSubscriptionButton from './ManageExpiredSubscriptionButton/ManageExpiredSubscriptionButton'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: ExpiredAccountClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment ExpiredAccountClubSupporterSubscriptionPreviewFragment on ExpiredAccountClubSupporterSubscription {
    supporterSince
    expiredAt
    club {
      name
      slug
      ...ClubIconFragment
    }
    ...ManageExpiredSubscriptionButtonFragment
  }
`

export default function ExpiredAccountClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const expiredAt = format(new Date(data.expiredAt != null && data.expiredAt), dateFormat, { locale })

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
          <LinkTile href={`/${data.club.slug}`}>
            <HStack spacing={3}>
              <ClubIcon size='md' clubQuery={data.club} />
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
          <Badge borderRadius='base' fontSize='sm' colorScheme='purple'>
            <Trans>
              EXPIRED
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
                Expired on
              </Trans>
            </Text>
            <Text {...descriptionProps}>
              {expiredAt}
            </Text>
          </HStack>
        </Stack>
        <ManageExpiredSubscriptionButton query={data} />
      </Stack>
    </LargeBackgroundBox>
  )
}
