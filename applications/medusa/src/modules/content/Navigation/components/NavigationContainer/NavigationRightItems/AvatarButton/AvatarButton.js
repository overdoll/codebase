/**
 * @flow
 */
import { Avatar, Button, IconButton, Tooltip } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import Login2 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-2.svg'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import NavLink from '@//:modules/routing/NavLink'
import type { AvatarButtonFragment$key } from '@//:artifacts/AvatarButtonFragment.graphql'

type Props = {
  viewer: AvatarButtonFragment$key,
}

const AccountFragmentGQL = graphql`
  fragment AvatarButtonFragment on Account {
    avatar
  }
`

export default function AvatarButton ({ viewer }: Props): Node {
  const [t] = useTranslation('navigation')

  const data = useFragment(AccountFragmentGQL, viewer)

  return (
    <NavLink to='/profile'>
      {(isActive) => (
        <Tooltip hasArrow label={t('nav.profile')} placement='bottom'>
          <Button
            bg='transparent'
            borderRadius={10}
            h='42px' w='42px' mr={1}
            display={{ base: 'none', md: 'flex' }}
            aria-label={t('nav.profile')}
          >
            <Avatar
              src={data.avatar} m={0} borderRadius='25%'
              w='38px' h='38px'
            />
          </Button>
        </Tooltip>
      )}
    </NavLink>
  )
}
