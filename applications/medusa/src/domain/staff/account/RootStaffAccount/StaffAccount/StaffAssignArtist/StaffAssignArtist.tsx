import { graphql, useFragment } from 'react-relay/hooks'
import { StaffAssignArtistFragment$key } from '@//:artifacts/StaffAssignArtistFragment.graphql'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import StaffAssignArtistButton from './StaffAssignArtistButton/StaffAssignArtistButton'
import StaffRevokeArtistButton from './StaffRevokeArtistButton/StaffRevokeArtistButton'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'

interface Props {
  query: StaffAssignArtistFragment$key
}

const Fragment = graphql`
  fragment StaffAssignArtistFragment on Account {
    isArtist
    isSecure
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
            <Heading color='green.400' fontSize='xl'>
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
            <Heading color='orange.400' fontSize='xl'>
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
      {!data.isSecure && (
        <Alert status='info'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              Account must enable multi factor before assigning artist role
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      {data.isArtist
        ? <StaffRevokeArtistButton query={data} />
        : <StaffAssignArtistButton query={data} />}
    </Stack>
  )
}
