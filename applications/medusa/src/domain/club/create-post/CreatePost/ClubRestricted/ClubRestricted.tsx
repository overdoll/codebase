import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { ClubRestrictedFragment$key } from '@//:artifacts/ClubRestrictedFragment.graphql'

import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import ClubInformationBanner from '../../../../../common/components/ClubInformationBanner/ClubInformationBanner'

interface Props {
  query: ClubRestrictedFragment$key
}

const Fragment = graphql`
  fragment ClubRestrictedFragment on Club {
    ...ClubInformationBannerFragment
  }
`

export default function ClubRestricted ({ query }: Props): JSX.Element {
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
                You cannot post at this time due to a restriction on your club
              </Trans>
            </Text>
          </Box>
        </Stack>
      </PostPlaceholder>
    </Stack>
  )
}
