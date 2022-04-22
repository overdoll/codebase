import { FlowBuilderNextButton, FlowBuilderPreviousButton } from '@//:modules/content/PageLayout/FlowBuilder'
import { Box, Flex } from '@chakra-ui/react'
import CurationDateOfBirthNextButton from './CurationDateOfBirthNextButton/CurationDateOfBirthNextButton'
import { graphql, useFragment } from 'react-relay/hooks'
import type { CurationStepperFooterFragment$key } from '@//:artifacts/CurationStepperFooterFragment.graphql'
import type {
  CurationDateOfBirthNextButtonFragment$key
} from '@//:artifacts/CurationDateOfBirthNextButtonFragment.graphql'
import CurationAudienceNextButton from './CurationAudienceNextButton/CurationAudienceNextButton'
import type { CurationAudienceNextButtonFragment$key } from '@//:artifacts/CurationAudienceNextButtonFragment.graphql'
import CurationCategoryNextButton from './CurationCategoryNextButton/CurationCategoryNextButton'
import type { CurationCategoryNextButtonFragment$key } from '@//:artifacts/CurationCategoryNextButtonFragment.graphql'

interface Props {
  query: CurationStepperFooterFragment$key | null
  currentStep: string
  nextStep: () => void
  isAtStart: boolean
}

const Fragment = graphql`
  fragment CurationStepperFooterFragment on CurationProfile {
    dateOfBirth {
      ...CurationDateOfBirthNextButtonFragment
    }
    audience {
      ...CurationAudienceNextButtonFragment
    }
    category {
      ...CurationCategoryNextButtonFragment
    }
  }
`

export default function CurationStepperFooter ({
  query,
  currentStep,
  nextStep,
  isAtStart
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const NextButton = (): JSX.Element => {
    switch (currentStep) {
      case 'dateOfBirth':
        return (
          <CurationDateOfBirthNextButton
            query={data?.dateOfBirth as CurationDateOfBirthNextButtonFragment$key}
            nextStep={nextStep}
          />
        )
      case 'audience':
        return (
          <CurationAudienceNextButton
            nextStep={nextStep}
            query={data?.audience as CurationAudienceNextButtonFragment$key}
          />
        )
      case 'category':
        return (
          <CurationCategoryNextButton
            nextStep={nextStep}
            query={data?.category as CurationCategoryNextButtonFragment$key}
          />
        )
      default:
        return <FlowBuilderNextButton />
    }
  }

  return (
    <Flex w='100%' justify='space-between'>
      {isAtStart ? <Box /> : <FlowBuilderPreviousButton />}
      <NextButton />
    </Flex>
  )
}
