import { graphql, useFragment } from 'react-relay/hooks'
import type { AccountDetailsFragment$key } from '@//:artifacts/AccountDetailsFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: AccountDetailsFragment$key
}

const Fragment = graphql`
  fragment AccountDetailsFragment on AccountDetails {
    firstName
    lastName
    country {
      name
      emoji
    }
  }
`

export default function AccountDetails ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={1}>
      <HStack spacing={2}>
        <Heading fontSize='sm' color='gray.100'>
          <Trans>
            First Name
          </Trans>
        </Heading>
        <Heading fontSize='sm' color='gray.200'>
          {data.firstName}
        </Heading>
      </HStack>
      <HStack spacing={2}>
        <Heading fontSize='sm' color='gray.100'>
          <Trans>
            Last Name
          </Trans>
        </Heading>
        <Heading fontSize='sm' color='gray.200'>
          {data.lastName}
        </Heading>
      </HStack>
      <HStack spacing={2}>
        <Heading fontSize='sm' color='gray.100'>
          <Trans>
            Country
          </Trans>
        </Heading>
        <Heading fontSize='sm' color='gray.200'>
          {data.country.emoji} {data.country.name}
        </Heading>
      </HStack>
    </Stack>
  )
}
