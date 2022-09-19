import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeAudienceThumbnailFragment$key } from '@//:artifacts/ChangeAudienceThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeAudienceThumbnailForm from './ChangeAudienceThumbnailForm/ChangeAudienceThumbnailForm'
import AudienceIcon from '@//:modules/content/PageLayout/Display/fragments/AudienceIcon/AudienceIcon'

interface Props {
  query: ChangeAudienceThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceThumbnailFragment on Audience {
    ...AudienceIconFragment
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
          <AudienceIcon size='xl' clubQuery={data} />
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
