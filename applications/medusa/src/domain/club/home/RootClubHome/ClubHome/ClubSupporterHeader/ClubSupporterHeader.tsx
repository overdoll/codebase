import { graphql, useFragment } from 'react-relay/hooks'
import { ClubSupporterHeaderFragment$key } from '@//:artifacts/ClubSupporterHeaderFragment.graphql'
import { LinkTile } from '@//:modules/content/ContentSelection'
import TextHeader from '../../../../../../common/components/TextHeader/TextHeader'
import { PayoutMethod, WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import StatisticHeader from '../../../../../../common/components/StatisticHeader/StatisticHeader'
import { useRouter } from 'next/router'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: ClubSupporterHeaderFragment$key
}

const Fragment = graphql`
  fragment ClubSupporterHeaderFragment on Club {
    __typename
  }
`

export default function ClubSupporterHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { query: { slug } } = useRouter()

  const supporters = (3321).toLocaleString()

  if (true) {
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
              Cannot Collect Subscriptions
            </Trans>)}
        >
          <Trans>
            In order to collect supporter subscription payments, you must post at least one piece of exclusive supporter
            content.
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
      <LargeBackgroundBox>
        <HStack spacing={4} justify='space-between'>
          <Heading fontSize='sm' color='gray.200'>
            <Trans>
              Post exclusive content at least once every 30 days to keep supporters
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
    </Stack>
  )
}
