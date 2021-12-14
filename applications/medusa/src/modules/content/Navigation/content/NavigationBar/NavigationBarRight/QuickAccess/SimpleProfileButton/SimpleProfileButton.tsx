import { Avatar, Flex } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import NavLink from '@//:modules/routing/NavLink'
import type { SimpleProfileButtonFragment$key } from '@//:artifacts/SimpleProfileButtonFragment.graphql'
import NavigationButton from '@//:modules/content/Navigation/components/NavigationButton/NavigationButton'

interface Props {
  query: SimpleProfileButtonFragment$key
}

const AccountFragmentGQL = graphql`
  fragment SimpleProfileButtonFragment on Account {
    avatar
  }
`

export default function SimpleProfileButton ({ query }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  const data = useFragment(AccountFragmentGQL, query)

  return (
    <NavLink to='/profile'>
      {({ isActive }) => (
        <NavigationButton
          label={t('nav.profile')}
          active={isActive}
        >
          <Flex
            h='100%'
            align='center'
            justify='center'
          >
            <Avatar
              borderRadius='25%'
              src={data.avatar as string}
              m={0}
              h='42px'
              w='42px'
            />
          </Flex>
        </NavigationButton>
      )}
    </NavLink>
  )
}
