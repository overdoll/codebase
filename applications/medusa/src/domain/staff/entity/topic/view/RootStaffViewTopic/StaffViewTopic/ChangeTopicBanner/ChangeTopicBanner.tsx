import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeTopicBannerFragment$key } from '@//:artifacts/ChangeTopicBannerFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeTopicBannerForm from './ChangeTopicBannerForm/ChangeTopicBannerForm'
import TopicIcon from '@//:modules/content/PageLayout/Display/fragments/TopicIcon/TopicIcon'

interface Props {
  query: ChangeTopicBannerFragment$key
}

const Fragment = graphql`
  fragment ChangeTopicBannerFragment on Topic {
    ...TopicIconFragment
    ...ChangeTopicBannerFormFragment
  }
`

export default function ChangeTopicBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Topic Banner
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <TopicIcon clubQuery={data} />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Banner
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeTopicBannerForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
