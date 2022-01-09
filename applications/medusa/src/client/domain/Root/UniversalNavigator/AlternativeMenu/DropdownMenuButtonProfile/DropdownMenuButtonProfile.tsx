import { Avatar, Flex, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { DropdownMenuButtonProfileFragment$key } from '@//:artifacts/DropdownMenuButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  queryRef: DropdownMenuButtonProfileFragment$key | null
}

const DropdownMenuButtonProfileGQL = graphql`
  fragment DropdownMenuButtonProfileFragment on Account {
    username
    avatar {
      urls {
        url
      }
    }
  }
`

export default function DropdownMenuButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(DropdownMenuButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigationDropdownMenu.Button
      to='/profile'
    >
      <Flex
        my={1}
        align='center'
      >
        <Avatar
          src={data?.avatar?.urls[0]?.url}
          pointerEvents='none'
          mr={4}
          borderRadius='25%'
          w='60px'
          h='60px'
        />
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
      </Flex>
    </HorizontalNavigationDropdownMenu.Button>
  )
}
