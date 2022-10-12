import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import AudiencePreferenceSelector from './AudiencePreferenceSelector/AudiencePreferenceSelector'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { UseSequenceReturn } from '../../../Sequence/types'

export interface AudiencePreferenceProp {
  audience: {
    [id: string]: {
      title: string
    }
  }
}

interface ChoiceProps {
  title: string
}

interface Props {
  audienceState: AudiencePreferenceProp['audience']
  dispatch: UseSequenceReturn<any>['dispatch']
}

export default function AudiencePreference (props: Props): JSX.Element {
  const {
    audienceState,
    dispatch
  } = props

  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  const {
    values,
    register
  } = useChoice<ChoiceProps>({
    defaultValue: audienceState,
    onChange: (props) => dispatch({
      type: 'audience',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <Stack spacing={4}>
      <Heading color='gray.00' fontSize='xl'>
        <Trans>
          Choose what you want to see
        </Trans>
      </Heading>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <AudiencePreferenceSelector
            values={values}
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
