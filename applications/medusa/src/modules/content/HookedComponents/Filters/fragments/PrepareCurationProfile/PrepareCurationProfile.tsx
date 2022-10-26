import { graphql, useFragment } from 'react-relay/hooks'
import type { PrepareCurationProfileFragment$key } from '@//:artifacts/PrepareCurationProfileFragment.graphql'
import type { PrepareCurationProfileRootFragment$key } from '@//:artifacts/PrepareCurationProfileRootFragment.graphql'

import { ObjectResolver, SequenceProvider, useSequence } from '../../../Sequence'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFooter } from '../../../../PageLayout'
import { CategoryIdentifier, ClubMembers } from '@//:assets/icons'
import AudiencePreference, { AudiencePreferenceProp } from '../AudiencePreference/AudiencePreference'
import CurationProfileFooter from './CurationProfileFooter/CurationProfileFooter'
import DiscoverClubsList from '../DiscoverClubsList/DiscoverClubsList'
import CurationProfileHeader from './CurationProfileHeader/CurationProfileHeader'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  accountQuery: PrepareCurationProfileFragment$key
  rootQuery: PrepareCurationProfileRootFragment$key
  onClose?: () => void
}

export interface PrepareCurationProfileSequenceProps extends AudiencePreferenceProp {
}

const AccountFragment = graphql`
  fragment PrepareCurationProfileFragment on Account {
    curationProfile {
      audience {
        audiences {
          id
          title
        }
      }
    }
    clubMembershipsCount
    ...CurationProfileFooterFragment
  }
`

const RootFragment = graphql`
  fragment PrepareCurationProfileRootFragment on Query {
    ...DiscoverClubsListFragment
  }
`

export default function PrepareCurationProfile (props: Props): JSX.Element {
  const {
    accountQuery,
    rootQuery,
    onClose
  } = props

  const data = useFragment(AccountFragment, accountQuery)
  const rootData = useFragment(RootFragment, rootQuery)

  const defaultAudience = data.curationProfile.audience.audiences.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      title: value.title
    }
  }), {}) as PrepareCurationProfileSequenceProps['audience']

  const methods = useSequence<PrepareCurationProfileSequenceProps>({
    defaultValue: {
      audience: defaultAudience
    },
    resolver: {
      audience: ObjectResolver()
    }
  })

  const steps = ['audience', 'clubs']

  const components = {
    audience: <AudiencePreference audienceState={methods.state.audience} dispatch={methods.dispatch} />,
    clubs: (
      <Stack spacing={4}>
        <Heading color='gray.00' fontSize='xl'>
          <Trans>
            Join some clubs
          </Trans>
        </Heading>
        <DiscoverClubsList query={rootData} />
      </Stack>
    )
  }

  const headers = {
    audience: {
      title: 'Select Audiences',
      icon: ClubMembers
    },
    clubs: {
      title: 'Select Categories',
      icon: CategoryIdentifier
    }
  }

  return (
    <SequenceProvider {...methods}>
      <FlowBuilder
        defaultStep='audience'
        colorScheme='orange'
        stepsArray={steps}
        stepsComponents={components}
        stepsHeaders={headers}
      >
        <CurationProfileHeader onClose={onClose} />
        <FlowBuilderBody />
        <FlowBuilderFooter>
          {({
            currentStep,
            nextStep
          }) => (
            <Flex w='100%' justify='flex-end'>
              <CurationProfileFooter
                onClose={onClose}
                query={data}
                currentStep={currentStep}
                nextStep={nextStep}
              />
            </Flex>
          )}
        </FlowBuilderFooter>
      </FlowBuilder>
    </SequenceProvider>
  )
}
