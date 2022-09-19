import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { DropdownMenuButtonProfileFragment$key } from '@//:artifacts/DropdownMenuButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/AccountIcon/AccountIcon'

interface Props {
  queryRef: DropdownMenuButtonProfileFragment$key | null
}

const DropdownMenuButtonProfileGQL = graphql`
  fragment DropdownMenuButtonProfileFragment on Account {
    id
    username
    ...AccountIconFragment
  }
`

export default function DropdownMenuButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(DropdownMenuButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigationDropdownMenu.Button
      href={{
        pathname: '/profile/[username]',
        query: { username: data?.username }
      }}
    >
      <RenderOnDesktop>
        <HStack
          align='center'
        >
          <AccountIcon size='xl' accountQuery={data} />
          <Flex direction='column'>
            <Text
              color='gray.00'
              fontFamily='mono'
              fontSize='xl'
            >
              {data?.username}
            </Text>
            <Text
              color='gray.300'
              fontSize='md'
            >
              <Trans>
                Go to my profile
              </Trans>
            </Text>
          </Flex>
        </HStack>
      </RenderOnDesktop>
      <RenderOnMobile>
        <Stack spacing={1} align='center'>
          <AccountIcon size='md' accountQuery={data} />
          <Heading
            color='gray.100'
            fontSize='lg'
            textAlign='center'
          >
            <Trans>
              My Profile
            </Trans>
          </Heading>
        </Stack>
      </RenderOnMobile>
    </HorizontalNavigationDropdownMenu.Button>
  )
}
