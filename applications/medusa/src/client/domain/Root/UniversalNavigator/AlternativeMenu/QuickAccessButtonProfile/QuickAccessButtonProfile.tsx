import { graphql, useFragment } from 'react-relay'
import { Avatar, Flex } from '@chakra-ui/react'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { QuickAccessButtonProfileFragment$key } from '@//:artifacts/QuickAccessButtonProfileFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  queryRef: QuickAccessButtonProfileFragment$key | null
}

const QuickAccessButtonProfileGQL = graphql`
  fragment QuickAccessButtonProfileFragment on Account {
    avatar
  }
`

export default function QuickAccessButtonProfile ({ queryRef }: Props): JSX.Element {
  const data = useFragment(QuickAccessButtonProfileGQL, queryRef)

  return (
    <HorizontalNavigation.Button
      w='42px'
      to='/profile'
      label={
        <Trans>
          Go to my profile
        </Trans>
      }
    >
      <Flex
        h='100%'
        align='center'
        justify='center'
      >
        <Avatar
          borderRadius='25%'
          src={data?.avatar}
          m={0}
          h='38px'
          w='38px'
        />
      </Flex>
    </HorizontalNavigation.Button>
  )
}
