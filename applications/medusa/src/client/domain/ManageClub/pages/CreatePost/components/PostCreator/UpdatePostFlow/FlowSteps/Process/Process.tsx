import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import type { ProcessFragment$key } from '@//:artifacts/ProcessFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import RootProcessContent from './RootProcessContent/RootProcessContent'

interface Props {
  query: ProcessFragment$key
}

const Fragment = graphql`
  fragment ProcessFragment on Post {
    ...RootProcessContentFragment
  }
`

export default function Process ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Your post is processing
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            When your post is done processing, you can review and submit it.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <RootProcessContent query={data} />
      </Stack>
    </>
  )
}
