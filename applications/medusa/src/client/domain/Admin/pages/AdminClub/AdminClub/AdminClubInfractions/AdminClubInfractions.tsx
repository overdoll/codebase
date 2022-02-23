import { graphql, useFragment } from 'react-relay/hooks'
import { AdminClubInfractionsFragment$key } from '@//:artifacts/AdminClubInfractionsFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: AdminClubInfractionsFragment$key
}

const Fragment = graphql`
  fragment AdminClubInfractionsFragment on Club {
    suspension {
      expires
    }
  }
`

export default function AdminClubInfractions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Infractions
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <></>
      </Stack>
    </>
  )
}
