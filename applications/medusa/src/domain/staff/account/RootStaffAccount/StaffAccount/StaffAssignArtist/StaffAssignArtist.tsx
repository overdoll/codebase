import { graphql, useFragment } from 'react-relay/hooks'
import { StaffAssignArtistFragment$key } from '@//:artifacts/StaffAssignArtistFragment.graphql'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import StaffAssignArtistButton from './StaffAssignArtistButton/StaffAssignArtistButton'
import StaffRevokeArtistButton from './StaffRevokeArtistButton/StaffRevokeArtistButton'

interface Props {
  query: StaffAssignArtistFragment$key
}

const Fragment = graphql`
  fragment StaffAssignArtistFragment on Account {
    isArtist
    ...StaffAssignArtistButtonFragment
    ...StaffRevokeArtistButtonFragment
  }
`

export default function StaffAssignArtist ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      {data.isArtist
        ? (
          <LargeBackgroundBox>
            <Heading color='green.300' fontSize='xl'>
              <Trans>
                Platform Artist
              </Trans>
            </Heading>
            <Text color='gray.00' fontSize='md'>
              <Trans>
                This account is an artist and can create clubs as well as post
              </Trans>
            </Text>
          </LargeBackgroundBox>
          )
        : (
          <LargeBackgroundBox>
            <Heading color='orange.300' fontSize='xl'>
              <Trans>
                Not Platform Artist
              </Trans>
            </Heading>
            <Text color='gray.00' fontSize='md'>
              <Trans>
                This account is not an artist
              </Trans>
            </Text>
          </LargeBackgroundBox>)}
      {data.isArtist
        ? <StaffRevokeArtistButton query={data} />
        : <StaffAssignArtistButton query={data} />}
    </Stack>
  )
}
