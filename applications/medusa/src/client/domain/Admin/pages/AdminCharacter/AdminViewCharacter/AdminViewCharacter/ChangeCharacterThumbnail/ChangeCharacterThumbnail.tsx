import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCharacterThumbnailFragment$key } from '@//:artifacts/ChangeCharacterThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../components/Collapse/Collapse'
import ChangeCharacterThumbnailForm from './ChangeCharacterThumbnailForm/ChangeCharacterThumbnailForm'

interface Props {
  query: ChangeCharacterThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeCharacterThumbnailFragment on Character {
    thumbnail {
      ...ResourceIconFragment
    }
    ...ChangeCharacterThumbnailFormFragment
  }
`

export default function ChangeCharacterThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Character Thumbnail
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
            <ChangeCharacterThumbnailForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
