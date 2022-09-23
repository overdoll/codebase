import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderClubsFeedFragment$key } from '@//:artifacts/HeaderClubsFeedFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'
import ClubsFeedDiscoverList from './ClubsFeedDiscoverList/ClubsFeedDiscoverList'

interface Props {
  rootQuery: HeaderClubsFeedFragment$key
}

const RootFragment = graphql`
  fragment HeaderClubsFeedFragment on Query {
    ...ClubsFeedDiscoverListFragment
  }
`

export default function HeaderClubsFeed (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>Your Clubs Feed</Trans>
          </Heading>
          <SearchButton />
        </HStack>
      </Stack>
      <ClubsFeedDiscoverList query={rootData} />
    </Stack>
  )
}
