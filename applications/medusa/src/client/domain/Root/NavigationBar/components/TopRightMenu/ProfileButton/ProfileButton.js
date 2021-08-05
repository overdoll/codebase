/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Avatar, Flex, Heading, MenuItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import NavLink from '@//:modules/routing/NavLink'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileButtonFragment$key } from '@//:artifacts/ProfileButtonFragment.graphql'

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
  const [t] = useTranslation('nav')

  const viewer = useFragment(ProfileButtonFragmentGQL, props.viewer)

  return (
    <NavLink to='/profile'>
      {(isActive) => (
        <MenuItem bg={isActive ? 'gray.700' : 'gray.800'}>
          <Avatar
            src={viewer.avatar} pointerEvents='none' mr={4} borderRadius='25%' w='60px'
            h='60px'
          />
          <Flex pointerEvents='none' direction='column'>
            <Heading color='gray.100' size='md'>{viewer.username}</Heading>
            <Text color='gray.300' size='xs'>{t('menu.profile')}</Text>
          </Flex>
        </MenuItem>
      )}
    </NavLink>
  )
}
