import { graphql, useFragment } from 'react-relay/hooks'
import type { CurationProfileFooterFragment$key } from '@//:artifacts/CurationProfileFooterFragment.graphql'
import CurationProfileAudienceButton from './CurationProfileAudienceButton/CurationProfileAudienceButton'
import CurationProfileDateOfBirthButton from './CurationProfileDateOfBirthButton/CurationProfileDateOfBirthButton'
import CurationProfileClubsButton from './CurationProfileClubsButton/CurationProfileClubsButton'

interface Props {
  query: CurationProfileFooterFragment$key
  currentStep: string
  nextStep: () => void
  onClose?: () => void
}

const Fragment = graphql`
  fragment CurationProfileFooterFragment on Account {
    curationProfile {
      audience {
        ...CurationProfileAudienceButtonFragment
      }
    }
    ...CurationProfileClubsButtonFragment
  }
`

export default function CurationProfileFooter (props: Props): JSX.Element {
  const {
    query,
    currentStep,
    nextStep,
    onClose
  } = props

  const data = useFragment(Fragment, query)

  if (currentStep === 'dateOfBirth') {
    return (
      <CurationProfileDateOfBirthButton nextStep={nextStep} />
    )
  }

  if (currentStep === 'audience') {
    return (
      <CurationProfileAudienceButton nextStep={nextStep} query={data.curationProfile.audience} />
    )
  }

  if (currentStep === 'clubs') {
    return <CurationProfileClubsButton onClose={onClose} query={data} />
  }

  return <></>
}
