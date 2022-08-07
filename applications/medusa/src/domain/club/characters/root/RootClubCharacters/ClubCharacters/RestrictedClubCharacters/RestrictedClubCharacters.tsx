import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { RestrictedClubCharactersFragment$key } from '@//:artifacts/RestrictedClubCharactersFragment.graphql'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import ClubInformationBanner from '../../../../../../../common/components/ClubInformationBanner/ClubInformationBanner'

interface Props {
  query: RestrictedClubCharactersFragment$key
}

const Fragment = graphql`
  fragment RestrictedClubCharactersFragment on Club {
    ...ClubInformationBannerFragment
  }
`

export default function RestrictedClubCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <ClubInformationBanner query={data} />
      <PostPlaceholder>
        <Stack spacing={6}>
          <Box>
            <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
              <Trans>
                Club Restricted
              </Trans>
            </Heading>
            <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
              <Trans>
                You cannot create or manage characters at this time due to a restriction on your club
              </Trans>
            </Text>
          </Box>
        </Stack>
      </PostPlaceholder>
    </Stack>
  )
}
