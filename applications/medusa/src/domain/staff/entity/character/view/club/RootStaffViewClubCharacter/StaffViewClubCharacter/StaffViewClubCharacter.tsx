import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewClubCharacterQuery } from '@//:artifacts/StaffViewClubCharacterQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'

import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import TagBadgeHeader from '@//:common/components/TagBadgeHeader/TagBadgeHeader'
import ChangeCharacterName from '../../../../../../../../common/components/ChangeCharacterName/ChangeCharacterName'
import ChangeCharacterThumbnail from '../../../../../../../../common/components/ChangeCharacterThumbnail/ChangeCharacterThumbnail'

interface Props {
  query: PreloadedQuery<StaffViewClubCharacterQuery>
}

const Query = graphql`
  query StaffViewClubCharacterQuery($slug: String!, $clubSlug: String) {
    character(slug: $slug, clubSlug: $clubSlug) {
      club {
        name
      }
      ...ChangeCharacterNameFragment
      ...ChangeCharacterThumbnailFragment
    }
  }
`

export default function StaffViewClubCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewClubCharacterQuery>(
    Query,
    query
  )

  if (queryData?.character == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeCharacterName query={queryData?.character} />
      </Box>
      <Box>
        <ChangeCharacterThumbnail query={queryData?.character} />
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Character Club
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <TagBadgeHeader>
          {queryData?.character?.club?.name}
        </TagBadgeHeader>
      </Box>
    </Stack>
  )
}
