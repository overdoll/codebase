import { Suspense, useContext } from 'react'
import type { UploadAudienceStepFragment$key } from '@//:artifacts/UploadAudienceStepFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import RequiredPrompt from '../../../../RequiredPrompt/RequiredPrompt'
import { Trans } from '@lingui/macro'
import SkeletonStack
  from '../../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import UploadAudiencesSingleSelector from './UploadAudiencesSingleSelector/UploadAudiencesSingleSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'

interface Props {
  query: UploadAudienceStepFragment$key
}

interface ChoiceProps {
  title: string
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

  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  const defaultValue = data.audience != null
    ? {
        [data.audience.id]: {
          title: data.audience.title
        }
      }
    : {}

  const { register } = useChoice({
    defaultValue: defaultValue,
    onChange: (props) => dispatch({
      type: 'audience',
      value: props
    })
  })

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
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <UploadAudiencesSingleSelector
            searchArguments={searchArguments}
            register={register}
          />
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
