import { graphql } from 'react-relay/hooks'
import UploadFlowHeader from './UploadFlowHeader/UploadFlowHeader'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import UploadAudienceStep from './UploadFlowSteps/UploadAudienceStep/UploadAudienceStep'
import UploadCategoryStep from './UploadFlowSteps/UploadCategoryStep/UploadCategoryStep'
import UploadArrangeStep from './UploadFlowSteps/UploadArrangeStep/UploadArrangeStep'
import UploadReviewStep from './UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { Trans } from '@lingui/macro'
import { CategoryIdentifier, CharacterIdentifier, ClubMembers, HeartFull } from '@//:assets/icons/interface'
import { FileMultiple } from '@//:assets/icons/navigation'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFooter } from '@//:modules/content/PageLayout'
import UploadFlowFooter from './UploadFlowFooter/UploadFlowFooter'
import UploadCharacterStep from './UploadFlowSteps/UploadCharacterStep/UploadCharacterStep'

interface Props {
  query: UpdatePostFlowFragment$key
}

const Fragment = graphql`
  fragment UpdatePostFlowFragment on Post {
    ...UploadFlowHeaderFragment
    ...UploadFlowFooterFragment
    ...UploadCategoryStepFragment
    ...UploadAudienceStepFragment
    ...UploadReviewStepFragment
    ...UploadCharacterStepFragment
    ...UploadArrangeStepFragment
  }
`

export default function UpdatePostFlow ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const steps = ['arrange', 'audience', 'category', 'character', 'review']
  const components = {
    arrange: <UploadArrangeStep query={data} />,
    audience: <UploadAudienceStep query={data} />,
    category: <UploadCategoryStep query={data} />,
    character: <UploadCharacterStep query={data} />,
    review: <UploadReviewStep query={data} />
  }
  const headers = {
    arrange: {
      title: <Trans>
        Arrange Uploads
      </Trans>,
      icon: FileMultiple
    },
    audience: {
      title: <Trans>
        Select Audience
      </Trans>,
      icon: ClubMembers
    },
    category: {
      title: <Trans>
        Add Categories
      </Trans>,
      icon: CategoryIdentifier
    },
    character: {
      title: <Trans>
        Add Character
      </Trans>,
      icon: CharacterIdentifier
    },
    review: {
      title: <Trans>
        Review Post
      </Trans>,
      icon: HeartFull
    }
  }

  return (
    <FlowBuilder
      colorScheme='teal'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <UploadFlowHeader query={data} />
      <FlowBuilderBody />
      <FlowBuilderFooter>
        {({
          currentStep,
          isAtStart,
          nextStep
        }) => (
          <UploadFlowFooter
            step={currentStep}
            isAtStart={isAtStart}
            nextStep={nextStep}
            query={data}
          />
        )}
      </FlowBuilderFooter>
    </FlowBuilder>
  )
}
