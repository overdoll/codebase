import { graphql, useFragment } from 'react-relay/hooks'
import { ClubSupporterHeaderFragment$key } from '@//:artifacts/ClubSupporterHeaderFragment.graphql'
import { LinkTile } from '@//:modules/content/ContentSelection'
import TextHeader from '../../../../../../common/components/TextHeader/TextHeader'
import { PayoutMethod, WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'

interface Props {
  query: ClubSupporterHeaderFragment$key
}

const Fragment = graphql`
  fragment ClubSupporterHeaderFragment on Club {
    canCreateSupporterOnlyPosts
    canSupport
    nextSupporterPostTime
    membersCount
    suspension {
      __typename
    }
  }
`

export default function ClubSupporterHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const supporterCount = data.membersCount

  const supporters = (data.membersCount).toLocaleString()

  const { query: { slug } } = useRouter()

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const nextSupporterPostTime = format(new Date(data.nextSupporterPostTime as Date), dateFormat, { locale })

  if (data.suspension !== null && supporterCount < 1) {
    return (
      <TextHeader
        colorScheme='orange'
        icon={WarningTriangle}
        title={(
          <Trans>
            Cannot Collect Subscriptions
          </Trans>)}
      >
        <Trans>
          In order to collect supporter subscription payments, your club must not be suspended.
        </Trans>
      </TextHeader>
    )
  }

  if (!data.canSupport && data.suspension == null && data.canCreateSupporterOnlyPosts) {
    return (
      <LinkTile
        href={{
          pathname: '/club/[slug]/create-post',
          query: { slug: slug }
        }}
      >
        <TextHeader
          colorScheme='orange'
          icon={WarningTriangle}
          title={(
            <Trans>
              Not Collecting Subscriptions
            </Trans>)}
        >
          <Trans>
            In order to collect supporter subscription payments, you must post at least one piece of exclusive supporter
            content
          </Trans>
        </TextHeader>
      </LinkTile>
    )
  }

  return (
    <Stack spacing={2}>
      <StatisticHeader
        icon={PayoutMethod}
        title={(
          <Trans>
            Supporters
          </Trans>)}
      >
        {supporters}
      </StatisticHeader>
      {data.suspension == null
        ? (
          <>
            {
              data.canCreateSupporterOnlyPosts
                ? (
                  <LargeBackgroundBox>
                    <HStack spacing={4} justify='space-between'>
                      <Heading fontSize='sm' color='gray.200'>
                        <Trans>
                          Post exclusive content at least once by {nextSupporterPostTime} to keep your supporters
                        </Trans>
                      </Heading>
                      <LinkButton
                        size='sm'
                        variant='solid'
                        href={{
                          pathname: '/club/[slug]/create-post',
                          query: { slug: slug }
                        }}
                      >
                        <Trans>
                          Create Post
                        </Trans>
                      </LinkButton>
                    </HStack>
                  </LargeBackgroundBox>
                  )
                : (
                  <LargeBackgroundBox>
                    <Heading fontSize='sm' color='gray.200'>
                      <Trans>
                        Creating supporter only posts has been disabled for your club
                      </Trans>
                    </Heading>
                  </LargeBackgroundBox>
                  )
            }
          </>
          )
        : (
          <LargeBackgroundBox>
            <Heading fontSize='sm' color='gray.200'>
              <Trans>
                You cannot collect new supporters because your club is suspended
              </Trans>
            </Heading>
          </LargeBackgroundBox>
          )}
    </Stack>
  )
}
