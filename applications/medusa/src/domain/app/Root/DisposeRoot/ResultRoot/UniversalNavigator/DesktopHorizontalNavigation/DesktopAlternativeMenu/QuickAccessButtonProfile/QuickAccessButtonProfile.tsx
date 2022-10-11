import { graphql } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import { QuickAccessButtonProfileQuery } from '@//:artifacts/QuickAccessButtonProfileQuery.graphql'
import { Trans } from '@lingui/macro'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { FeedMenu } from '@//:assets/icons'

const Query = graphql`
  query QuickAccessButtonProfileQuery {
    viewer {
      username
      ...AccountIconFragment
    }
  }
`

export default function QuickAccessButtonProfile (): JSX.Element {
  const data = useLazyLoadQuery<QuickAccessButtonProfileQuery>(Query, {})

  if (data.viewer == null) return <></>

  return (
    <Box p={2}>
      <HorizontalNavigationButton
        icon={FeedMenu}
        href={{
          pathname: '/profile/[username]',
          query: { username: data.viewer.username }
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
          <AccountIcon size='md' accountQuery={data.viewer} />
        </Flex>
      </HorizontalNavigationButton>
    </Box>
  )
}
