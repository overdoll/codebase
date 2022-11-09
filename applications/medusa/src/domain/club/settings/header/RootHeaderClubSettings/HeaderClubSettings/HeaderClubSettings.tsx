import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { HeaderClubSettingsQuery } from '@//:artifacts/HeaderClubSettingsQuery.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import ChangeClubHeaderUpload from './ChangeClubHeaderUpload/ChangeClubHeaderUpload'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ClubHeader from '@//:modules/content/HookedComponents/Club/fragments/ClubHeader/ClubHeader'

interface Props {
  query: PreloadedQuery<HeaderClubSettingsQuery>
}

const Query = graphql`
  query HeaderClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      id
      header {
        __typename
      }
      ...ClubHeaderFragment
      ...ClubIconFragment
      ...ChangeClubHeaderUploadFragment
    }
  }
`

export default function HeaderClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<HeaderClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={4}>
      {queryData.club.header == null ? <></> : <ClubHeader clubQuery={queryData.club} />}
      {queryData.club.header != null && queryData.club.header.__typename === 'RawMedia' && (
        <LargeBackgroundBox>
          <Heading fontSize='md' color='gray.200'>
            <Trans>
              Your club header is currently processing. We'll update it shortly.
            </Trans>
          </Heading>
        </LargeBackgroundBox>
      )}
      <ChangeClubHeaderUpload query={queryData.club} />
    </Stack>
  )
}
