import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeClubThumbnailFragment$key } from '@//:artifacts/ChangeClubThumbnailFragment.graphql'
import { Flex } from '@chakra-ui/react'
import {
  ListSpacer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap,
  ResourceIcon
} from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeClubThumbnailForm from './ChangeClubThumbnailForm/ChangeClubThumbnailForm'

interface Props {
  query: ChangeClubThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeClubThumbnailFragment on Club {
    thumbnail {
      ...ResourceIconFragment
    }
    ...ChangeClubThumbnailFormFragment
  }
`

export default function ChangeClubThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Thumbnail
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          A square image is recommended.
        </PageSectionDescription>
      </PageSectionWrap>
      <ListSpacer>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon w={16} h={16} query={data?.thumbnail} />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Club Thumbnail
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeClubThumbnailForm query={data} />
          </CollapseBody>
        </Collapse>
      </ListSpacer>

    </>
  )
}
