import { graphql, useFragment } from 'react-relay/hooks'
import { ClubSupporterHeaderFragment$key } from '@//:artifacts/ClubSupporterHeaderFragment.graphql'
import { LinkTile } from '@//:modules/content/ContentSelection'
import TextHeader from '../../../../../../common/components/TextHeader/TextHeader'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'

interface Props {
  query: ClubSupporterHeaderFragment$key
}

// TODO implement this when the variable is available

const Fragment = graphql`
  fragment ClubSupporterHeaderFragment on Club {
    __typename
  }
`

export default function ClubSupporterHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  /*

  const supporters = (3321).toLocaleString()

   */

  const { query: { slug } } = useRouter()

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
          content. {data.__typename}
        </Trans>
      </TextHeader>
    </LinkTile>
  )
  /*
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

   */
}
