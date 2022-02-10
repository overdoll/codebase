import { graphql, useFragment } from 'react-relay/hooks'
import type { AudiencesCurationStepFragment$key } from '@//:artifacts/AudiencesCurationStepFragment.graphql'
import { Box } from '@chakra-ui/react'
import { Suspense, useContext, useEffect } from 'react'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import AudienceMultiSelector from './AudienceMultiSelector/AudienceMultiSelector'
import { useMultiSelector } from '@//:modules/content/ContentSelection'

interface Props {
  query: AudiencesCurationStepFragment$key | null
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
  const state = useContext(StateContext)

  const currentAudiences = data?.audience?.audiences.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {})

  const defaultValue = Object.keys(state.audience.value).length > 0
    ? state.audience.value
    : (data?.audience != null && data?.audience?.audiences?.length > 0)
        ? currentAudiences
        : {}

  const [currentSelection, changeSelection] = useMultiSelector(
    {
      defaultValue: defaultValue
    }
  )

  useEffect(() => {
    dispatch({
      type: 'audience',
      value: currentSelection
    })
  }, [currentSelection])

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
        <QueryErrorBoundary loadQuery={() => {
        }}
        >
          <Suspense fallback={<SkeletonStack />}>
            <AudienceMultiSelector selected={currentSelection} onSelect={changeSelection} />
          </Suspense>
        </QueryErrorBoundary>
      </Box>
    </Box>
  )
}
