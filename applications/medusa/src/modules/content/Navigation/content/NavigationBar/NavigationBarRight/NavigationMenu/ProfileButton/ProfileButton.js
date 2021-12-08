/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Avatar, Flex, Heading, MenuDivider, MenuItem, Text } from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileButtonFragment$key } from '@//:artifacts/ProfileButtonFragment.graphql'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { MenuButton } from '@//:modules/content/Navigation/components'

type Props = {
  query: ProfileButtonFragment$key
}

const ProfileButtonFragmentGQL = graphql`
  fragment ProfileButtonFragment on Account {
    username
    avatar
  }
`

export default function ProfileButton ({ query }: Props): Node {
  const [t] = useTranslation('navigation')

  const data = useFragment(ProfileButtonFragmentGQL, query)

  return (
    <>
      <NavLink to='/profile'>
        {({ isActive }) => (
          <MenuButton active={isActive}>
            <Flex my={1} align='center'>
              <Avatar
                src={data.avatar} pointerEvents='none' ml={1} mr={4} borderRadius='25%' w='60px'
                h='60px'
              />
              <Flex direction='column'>
                <Text color='gray.00' fontFamily='mono' fontSize='xl'>{data.username}</Text>
                <Text color='gray.300' fontSize='md'>{t('menu.profile')}</Text>
              </Flex>
            </Flex>
          </MenuButton>
        )}
      </NavLink>
    </>
  )
}
