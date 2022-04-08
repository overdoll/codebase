import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ChangeClubThumbnailQuery } from '@//:artifacts/ChangeClubThumbnailQuery.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeClubThumbnailForm from './ChangeClubThumbnailForm/ChangeClubThumbnailForm'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ChangeClubThumbnailQuery>
}

const Query = graphql`
  query ChangeClubThumbnailQuery($slug: String!) {
    club(slug: $slug) {
      thumbnail {
        ...ResourceIconFragment
      }
      ...ChangeClubThumbnailFormFragment
    }
  }
`

export default function ChangeClubThumbnail ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ChangeClubThumbnailQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={4}>
      <Flex w='100%' align='center' justify='center'>
        <ResourceIcon w={16} h={16} query={queryData.club.thumbnail} />
      </Flex>
      <Collapse>
        <CollapseButton size='md'>
          <Trans>
            Change Club Thumbnail
          </Trans>
        </CollapseButton>
        <CollapseBody>
          <ChangeClubThumbnailForm query={queryData.club} />
        </CollapseBody>
      </Collapse>
    </Stack>
  )
}
