import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay'
import { Avatar, Flex } from '@chakra-ui/react'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { QuickAccessButtonProfileFragment$key } from '@//:artifacts/QuickAccessButtonProfileFragment.graphql'

interface Props {
  queryRef: QuickAccessButtonProfileFragment$key
}

const QuickAccessButtonProfileGQL = graphql`
  fragment QuickAccessButtonProfileFragment on Account {
    avatar
  }
`

export default function QuickAccessButtonProfile ({ queryRef }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  const data = useFragment(QuickAccessButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigation.Button
      to='/profile'
      label={t('nav.profile')}
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
    </HorizontalNavigation.Button>
  )
}
