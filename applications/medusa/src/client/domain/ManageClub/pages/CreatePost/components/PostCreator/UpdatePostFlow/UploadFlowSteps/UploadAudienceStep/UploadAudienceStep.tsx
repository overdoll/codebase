import { Suspense, useContext, useEffect } from 'react'
import type { UploadAudienceStepFragment$key } from '@//:artifacts/UploadAudienceStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Flex, Stack } from '@chakra-ui/react'
import { useSingleSelector } from '../../../../../../../../../../modules/content/ContentSelection'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import RequiredPrompt from '../../../../RequiredPrompt/RequiredPrompt'
import { Trans } from '@lingui/macro'
import SkeletonStack
  from '../../../../../../../../../../modules/content/Placeholder/Skeleton/SkeletonStack/SkeletonStack'
import UploadAudiencesSingleSelector from './UploadAudiencesSingleSelector/UploadAudiencesSingleSelector'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'

interface Props {
  query: UploadAudienceStepFragment$key
}

const Fragment = graphql`
  fragment UploadAudienceStepFragment on Post {
    audience {
      id
      title
    }
  }
`

export default function UploadAudienceStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const dispatch = useContext(DispatchContext)

  const [currentSelection, setCurrentSelection] = useSingleSelector({ defaultValue: data?.audience?.id as string })

  useEffect(() => {
    dispatch({
      type: 'audience',
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Who is the target audience?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            The audience is the group of people that you intended this post for. This will determine whether or not a
            user can see your post based on their set preferences.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => {
      }}
      >
        <Suspense fallback={<SkeletonStack />}>
          <UploadAudiencesSingleSelector selected={currentSelection} onSelect={setCurrentSelection} />
        </Suspense>
      </QueryErrorBoundary>
      <Flex justify='center'>
        <RequiredPrompt>
          <Trans>
            Selecting an audience allows us to filter out content that someone would otherwise not prefer to see. We
            only show a person content they are interested in seeing.
          </Trans>
        </RequiredPrompt>
      </Flex>
    </Stack>
  )
}
