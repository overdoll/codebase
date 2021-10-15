/**
 * @flow
 */
import { Avatar, Button, Tooltip } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { Node } from 'react'
import { useTranslation } from 'react-i18next'
import NavLink from '@//:modules/routing/NavLink'
import type { AvatarMenuFragment$key } from '@//:artifacts/AvatarMenuFragment.graphql'

type Props = {
  viewer: AvatarMenuFragment$key,
}

const AccountFragmentGQL = graphql`
    fragment AvatarMenuFragment on Account {
        avatar
    }
`

export default function AvatarMenu ({ viewer }: Props): Node {
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
              borderRadius='25%'
              src={data.avatar} m={0}
              w='38px' h='38px'
            />
          </Button>
        </Tooltip>
      )}
    </NavLink>
  )
}
