import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffViewCharacterQuery } from '@//:artifacts/StaffViewCharacterQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeCharacterName from './ChangeCharacterName/ChangeCharacterName'
import ChangeCharacterThumbnail from './ChangeCharacterThumbnail/ChangeCharacterThumbnail'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import TagBadgeHeader from '../../../../../../../common/components/TagBadgeHeader/TagBadgeHeader'

interface Props {
  query: PreloadedQuery<StaffViewCharacterQuery>
}

const Query = graphql`
  query StaffViewCharacterQuery($slug: String!, $seriesSlug: String!) {
    character(slug: $slug, seriesSlug: $seriesSlug) {
      series {
        title
      }
      ...ChangeCharacterNameFragment
      ...ChangeCharacterThumbnailFragment
    }
  }
`

export default function StaffViewCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffViewCharacterQuery>(
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
              Character Series
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <TagBadgeHeader>
          {queryData.character.series.title}
        </TagBadgeHeader>
      </Box>
    </Stack>
  )
}
