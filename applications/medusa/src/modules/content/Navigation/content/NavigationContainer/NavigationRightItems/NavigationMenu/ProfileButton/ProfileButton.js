/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Avatar, Flex, Heading, MenuDivider, MenuItem, Text } from '@chakra-ui/react'
import NavLink from '@//:modules/routing/NavLink'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileButtonFragment$key } from '@//:artifacts/ProfileButtonFragment.graphql'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  viewer: ProfileButtonFragment$key
}

const ProfileButtonFragmentGQL = graphql`
  fragment ProfileButtonFragment on Account {
    username
    avatar
  }
`

export default function ProfileButton (props: Props): Node {
  const [t] = useTranslation('navigation')

  const viewer = useFragment(ProfileButtonFragmentGQL, props.viewer)

  return (
    <>
      <NavLink to='/profile'>
        {({ isActive }) => (
          <ClickableBox bg={isActive ? 'gray.700' : 'gray.800'}>
            <Avatar
              src={viewer.avatar} pointerEvents='none' mr={4} borderRadius='25%' w='60px'
              h='60px'
            />
            <Flex pointerEvents='none' direction='column'>
              <Heading color='gray.100' size='md'>{viewer.username}</Heading>
              <Text color='gray.300' size='xs'>{t('menu.profile')}</Text>
            </Flex>
          </ClickableBox>
        )}
      </NavLink>
      <MenuDivider />
    </>
  )
}
