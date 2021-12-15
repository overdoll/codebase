import { useTranslation } from 'react-i18next'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import HorizontalNavigationMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationMenu/HorizontalNavigationMenu'
import { QuickAccessMenuProfileFragment$key } from '@//:artifacts/QuickAccessMenuProfileFragment.graphql'

interface Props {
  queryRef: QuickAccessMenuProfileFragment$key
}

const ProfileButtonFragmentGQL = graphql`
  fragment QuickAccessMenuProfileFragment on Account {
    username
    avatar
  }
`

export default function QuickAccessMenuProfile ({ queryRef }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  const data = useFragment(ProfileButtonFragmentGQL, queryRef)

  return (
    <HorizontalNavigationMenu.Button
      to='/profile'
      label={t('nav.profile')}
    >
      <Flex
        my={1}
        align='center'
      >
        <Avatar
          src={data?.avatar as string}
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
            {t('menu.profile')}
          </Text>
        </Flex>
      </Flex>
    </HorizontalNavigationMenu.Button>
  )
}
