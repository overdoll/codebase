import { graphql, useFragment } from 'react-relay'
import { Flex } from '@chakra-ui/react'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import { QuickAccessButtonProfileFragment$key } from '@//:artifacts/QuickAccessButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'

interface Props {
  queryRef: QuickAccessButtonProfileFragment$key | null
}

const QuickAccessButtonProfileGQL = graphql`
  fragment QuickAccessButtonProfileFragment on Account {
    username
    ...AccountIconFragment
  }
`

export default function QuickAccessButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(QuickAccessButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigationButton
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
        <AccountIcon size='md' accountQuery={data} />
      </Flex>
    </HorizontalNavigationButton>
  )
}