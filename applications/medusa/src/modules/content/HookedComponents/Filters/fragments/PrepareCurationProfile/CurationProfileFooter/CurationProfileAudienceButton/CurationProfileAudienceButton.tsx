import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  CurationProfileAudienceButtonFragment$key
} from '@//:artifacts/CurationProfileAudienceButtonFragment.graphql'
import compareTwoArrays from '@//:modules/support/compareTwoArrays'
import { FlowBuilderNextButton, FlowBuilderSaveButton, FlowBuilderSkipButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import posthog from 'posthog-js'

interface Props {
  nextStep: () => void
  query: CurationProfileAudienceButtonFragment$key | null
}

const Fragment = graphql`
  fragment CurationProfileAudienceButtonFragment on AudienceCurationProfile {
    audiences {
      id
    }
  }
`

const Mutation = graphql`
  mutation CurationProfileAudienceButtonMutation($audienceIds: [ID!]!, $skipped: Boolean!) {
    updateCurationProfileAudience(input: {audienceIds: $audienceIds, skipped: $skipped}) {
      curationProfile {
        id
        completed
        audience {
          skipped
          completed
          audiences {
            id
          }
        }
      }
    }
  }
`

export default function CurationProfileAudienceButton (props: Props): JSX.Element {
  const {
    query,
    nextStep
  } = props

  const data = useFragment(Fragment, query)

  const [updateAudience, isUpdatingAudience] = useMutation(Mutation)

  const {
    state
  } = useSequenceContext()

  const notify = useToast()

  const currentAudienceIds = data?.audiences.map((item) => item.id) ?? []

  const saveCondition = Object.keys(state.audience).length > 0 &&
    compareTwoArrays(Object.keys(state.audience), currentAudienceIds) === false

  const onUpdateAudience = (): void => {
    updateAudience({
      variables: {
        audienceIds: Object.keys(state.audience),
        skipped: false
      },
      onCompleted () {
        posthog?.capture('update-curation-audience')
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audiences`
        })
      }
    })
  }

  const onSkipAudience = (): void => {
    updateAudience({
      variables: {
        audienceIds: [],
        skipped: true
      },
      onCompleted () {
        posthog?.capture('update-curation-audience')
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audiences`
        })
      }
    })
  }

  if (Object.keys(state.audience).length < 1 && currentAudienceIds.length < 1) {
    return (
      <FlowBuilderSkipButton
        isLoading={isUpdatingAudience}
        onClick={onSkipAudience}
      />
    )
  }

  if (saveCondition) {
    return (
      <FlowBuilderSaveButton
        isLoading={isUpdatingAudience}
        onClick={onUpdateAudience}
      />
    )
  }

  return <FlowBuilderNextButton />
}
