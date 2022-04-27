import { graphql, useFragment } from 'react-relay'
import { Flex } from '@chakra-ui/react'
import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import { QuickAccessButtonProfileFragment$key } from '@//:artifacts/QuickAccessButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  queryRef: QuickAccessButtonProfileFragment$key | null
}

const QuickAccessButtonProfileGQL = graphql`
  fragment QuickAccessButtonProfileFragment on Account {
    id
    username
    avatar {
      ...ResourceIconFragment
    }
  }
`

export default function QuickAccessButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(QuickAccessButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigation.Button
      href={{
        pathname: '/profile/[username]',
        query: { username: data?.username }
      }}
      label={
        <Trans>
          Go to my profile
        </Trans>
      }
    >
      <Flex
        h='100%'
        align='center'
        justify='center'
      >
        <ResourceIcon
          seed={data?.id}
          h='38px'
          w='38px'
          query={data?.avatar}
        />
      </Flex>
    </HorizontalNavigation.Button>
  )
}
