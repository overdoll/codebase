import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeAudienceThumbnailFragment$key } from '@//:artifacts/ChangeAudienceThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeAudienceThumbnailForm from './ChangeAudienceThumbnailForm/ChangeAudienceThumbnailForm'

interface Props {
  query: ChangeAudienceThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceThumbnailFragment on Audience {
    id
    thumbnail {
      ...ResourceIconFragment
    }
    ...ChangeAudienceThumbnailFormFragment
  }
`

export default function ChangeAudienceThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Audience Thumbnail
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon
            showBorder
            seed={data.id}
            w={16}
            h={16}
            query={data.thumbnail}
          />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Thumbnail
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeAudienceThumbnailForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
