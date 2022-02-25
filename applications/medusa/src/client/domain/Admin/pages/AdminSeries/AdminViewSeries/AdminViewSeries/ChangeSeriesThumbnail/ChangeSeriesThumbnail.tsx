import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeSeriesThumbnailFragment$key } from '@//:artifacts/ChangeSeriesThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../../modules/content/ThemeComponents/Collapse/Collapse'
import ChangeSeriesThumbnailForm from './ChangeSeriesThumbnailForm/ChangeSeriesThumbnailForm'

interface Props {
  query: ChangeSeriesThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeSeriesThumbnailFragment on Series {
    thumbnail {
      ...ResourceIconFragment
    }
    ...ChangeSeriesThumbnailFormFragment
  }
`

export default function ChangeSeriesThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Series Thumbnail
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon w={16} h={16} query={data.thumbnail} />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Thumbnail
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeSeriesThumbnailForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
