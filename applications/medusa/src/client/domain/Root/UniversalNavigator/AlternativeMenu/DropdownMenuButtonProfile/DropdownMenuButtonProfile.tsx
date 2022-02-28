import { Flex, Heading, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { DropdownMenuButtonProfileFragment$key } from '@//:artifacts/DropdownMenuButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'
import { RenderOnDesktop, RenderOnMobile, ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  queryRef: DropdownMenuButtonProfileFragment$key | null
}

const DropdownMenuButtonProfileGQL = graphql`
  fragment DropdownMenuButtonProfileFragment on Account {
    username
    avatar {
      ...ResourceIconFragment
    }
  }
`

export default function DropdownMenuButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(DropdownMenuButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigationDropdownMenu.Button
      to={`/m/${data?.username as string}`}
    >
      <RenderOnDesktop>
        <Flex
          my={1}
          align='center'
        >
          <ResourceIcon
            w='60px'
            pointerEvents='none'
            h='60px'
            mr={4}
            query={data?.avatar}
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
      </RenderOnDesktop>
      <RenderOnMobile>
        <Flex direction='column' align='center'>
          <ResourceIcon
            w={8}
            h={8}
            query={data?.avatar}
            mb={2}
          />
          <Heading
            color='gray.100'
            fontSize='lg'
            textAlign='center'
          >
            <Trans>
              My Profile
            </Trans>
          </Heading>
        </Flex>
      </RenderOnMobile>
    </HorizontalNavigationDropdownMenu.Button>
  )
}
