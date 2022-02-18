import { graphql, useFragment } from 'react-relay/hooks'
import type { AudiencesCurationStepFragment$key } from '@//:artifacts/AudiencesCurationStepFragment.graphql'
import { Box } from '@chakra-ui/react'
import { Suspense, useContext } from 'react'
import { DispatchContext } from '@//:modules/hooks/useReducerBuilder/context'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import AudienceMultiSelector from './AudienceMultiSelector/AudienceMultiSelector'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface Props {
  query: AudiencesCurationStepFragment$key | null
}

interface ChoiceProps {
  title: string
}

const Fragment = graphql`
  fragment AudiencesCurationStepFragment on CurationProfile {
    audience {
      audiences {
        id
        title
      }
    }
  }
`

export default function AudiencesCurationStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const dispatch = useContext(DispatchContext)

  const currentAudiences = data?.audience?.audiences.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {})

  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  const { register } = useChoice<ChoiceProps>({
    defaultValue: currentAudiences,
    onChange: (props) => dispatch({
      type: 'audience',
      value: props
    })
  })

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            An "audience" can also be called a "preference". Select the type of targeted content you are only interested
            in seeing. Leaving other options unselected tells us you don't want to see this content at all.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Box maxH='60vh' overflowY='auto'>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<SkeletonStack />}>
            <AudienceMultiSelector searchArguments={searchArguments} register={register} />
          </Suspense>
        </QueryErrorBoundary>
      </Box>
    </Box>
  )
}
