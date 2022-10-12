import { HeaderClubSupporterFragment$key } from '@//:artifacts/HeaderClubSupporterFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubSupportLinks from './ClubSupportLinks/ClubSupportLinks'

interface Props {
  rootQuery: HeaderClubSupporterFragment$key
}

const RootFragment = graphql`
  fragment HeaderClubSupporterFragment on Query {
    ...ClubSupportLinksFragment
  }
`

export default function HeaderClubSupporter (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <Box overflow='hidden' h='100%' position='relative' w='100%'>
      <Flex top={0} bottom={0} left={0} right={0} position='absolute' />
      <Center bg='dimmers.200' minH={300} py={24} position='relative' w='100%'>
        <Stack spacing={8}>
          <Heading textAlign='center' color='gray.00' fontSize='6xl'>
            <Trans>
              Become Supporter
            </Trans>
          </Heading>
          <ClubSupportLinks rootQuery={rootData} />
        </Stack>
      </Center>
    </Box>
  )
}
