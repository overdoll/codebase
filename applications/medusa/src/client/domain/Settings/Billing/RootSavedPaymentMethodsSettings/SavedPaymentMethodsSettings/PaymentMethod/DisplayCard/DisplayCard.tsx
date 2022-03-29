import { graphql } from 'react-relay'
import type { DisplayCardFragment$key } from '@//:artifacts/DisplayCardFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import {
  CreditCardAmex,
  CreditCardDiscover,
  CreditCardJCB,
  CreditCardMasterCard,
  CreditCardVisa
} from '@//:assets/icons'

interface Props {
  query: DisplayCardFragment$key
}

const Fragment = graphql`
  fragment DisplayCardFragment on Card {
    type
  }
`

const creditCards = {
  VISA: CreditCardVisa,
  AMEX: CreditCardAmex,
  DISCOVER: CreditCardDiscover,
  JCB: CreditCardJCB,
  MASTERCARD: CreditCardMasterCard
}

export default function DisplayCard ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (creditCards[data.type] == null) {
    return (
      <Text fontFamily='mono' fontSize='md' color='gray.00'>
        {data.type}
      </Text>
    )
  }

  return (
    <Flex h='100%' align='center'>
      <Box display='block' p={1} borderRadius='base' bg='gray.00'>
        <Icon fill='inherit' icon={creditCards[data.type]} w={5} h={5} />
      </Box>
    </Flex>
  )
}
