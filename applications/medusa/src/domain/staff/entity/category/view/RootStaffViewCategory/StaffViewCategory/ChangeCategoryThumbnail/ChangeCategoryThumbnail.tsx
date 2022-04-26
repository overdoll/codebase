import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCategoryThumbnailFragment$key } from '@//:artifacts/ChangeCategoryThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeCategoryThumbnailForm from './ChangeCategoryThumbnailForm/ChangeCategoryThumbnailForm'

interface Props {
  query: ChangeCategoryThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeCategoryThumbnailFragment on Category {
    id
    thumbnail {
      ...ResourceIconFragment
    }
    ...ChangeCategoryThumbnailFormFragment
  }
`

export default function ChangeCategoryThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Category Thumbnail
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon seed={data.id} w={16} h={16} query={data.thumbnail} />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Thumbnail
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCategoryThumbnailForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
