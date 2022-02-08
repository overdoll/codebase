import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationProfileSetupQuery } from '@//:artifacts/CurationProfileSetupQuery.graphql'
import { Trans } from '@lingui/macro'
import { UserHuman } from '@//:assets/icons/navigation'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { CategoryIdentifier, ClubMembers } from '@//:assets/icons/interface'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderHeader,
  FlowBuilderProgress
} from '../../../../../../../../modules/content/PageLayout/FlowBuilder'
import DateOfBirthCurationStep from './DateOfBirthCurationStep/DateOfBirthCurationStep'
import { useHistoryDisclosure, useReducerBuilder } from '@//:modules/hooks'
import { singleStringValueReducer } from '@//:modules/hooks/useReducerBuilder/options'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import objectCategoryValueReducer from '@//:modules/hooks/useReducerBuilder/options/objectCategoryValueReducer'
import AudiencesCurationStep from './AudiencesCurationStep/AudiencesCurationStep'
import CategoriesCurationStep from './CategoriesCurationStep/CategoriesCurationStep'
import type { AudiencesCurationStepFragment$key } from '@//:artifacts/AudiencesCurationStepFragment.graphql'
import type { DateOfBirthCurationStepFragment$key } from '@//:artifacts/DateOfBirthCurationStepFragment.graphql'
import type { CategoriesCurationStepFragment$key } from '@//:artifacts/CategoriesCurationStepFragment.graphql'
import CurationStepperFooter from './CurationStepperFooter/CurationStepperFooter'
import type { CurationStepperFooterFragment$key } from '@//:artifacts/CurationStepperFooterFragment.graphql'
import { useUpdateEffect } from 'usehooks-ts'
import CloseButton from '@//:modules/form/CloseButton/CloseButton'
import LinkButton from '@//:modules/form/LinkButton/LinkButton'

interface Props {
  query: PreloadedQuery<CurationProfileSetupQuery>
}

const Query = graphql`
  query CurationProfileSetupQuery {
    viewer {
      curationProfile {
        completed
        ...DateOfBirthCurationStepFragment
        ...AudiencesCurationStepFragment
        ...CategoriesCurationStepFragment
        ...CurationStepperFooterFragment
      }
    }
  }
`

export default function CurationProfileSetup (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<CurationProfileSetupQuery>(
    Query,
    props.query
  )
  const [state, dispatch] = useReducerBuilder({
    dateOfBirth: singleStringValueReducer({ dispatchType: 'dateOfBirth' }),
    audience: objectCategoryValueReducer({ dispatchType: 'audience' }),
    category: objectCategoryValueReducer({ dispatchType: 'category' })
  })

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const steps = ['dateOfBirth', 'audience', 'category']

  const components = {
    dateOfBirth: <DateOfBirthCurationStep
      query={queryData?.viewer?.curationProfile as DateOfBirthCurationStepFragment$key}
                 />,
    audience: <AudiencesCurationStep
      query={queryData?.viewer?.curationProfile as AudiencesCurationStepFragment$key}
              />,
    category: <CategoriesCurationStep
      query={queryData?.viewer?.curationProfile as CategoriesCurationStepFragment$key}
              />
  }

  const headers = {
    dateOfBirth: {
      title: 'Your Age',
      icon: UserHuman
    },
    audience: {
      title: 'Audiences',
      icon: ClubMembers
    },
    category: {
      title: 'Categories',
      icon: CategoryIdentifier
    }
  }

  useUpdateEffect(() => {
    if (queryData?.viewer?.curationProfile?.completed === true) {
      onOpen()
    }
  }, [queryData?.viewer?.curationProfile?.completed])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Stack spacing={2}>
          {queryData?.viewer?.curationProfile?.completed === true &&
            <Alert
              colorScheme='teal'
            >
              <AlertIcon />
              <AlertDescription>
                <Trans>
                  Your curation profile is already complete. Going through the setup will overwrite your current
                  profile.
                </Trans>
              </AlertDescription>
            </Alert>}
          <FlowBuilder
            colorScheme='orange'
            stepsArray={steps}
            stepsComponents={components}
            stepsHeaders={headers}
          >
            <Stack
              bg='gray.800'
              borderRadius='md'
              p={3}
              spacing={2}
            >
              <FlowBuilderHeader />
              <FlowBuilderProgress />
            </Stack>
            <FlowBuilderBody />
            <FlowBuilderFooter>
              {({
                currentStep,
                nextStep,
                isAtStart
              }) => (
                <CurationStepperFooter
                  query={queryData?.viewer?.curationProfile as CurationStepperFooterFragment$key}
                  currentStep={currentStep}
                  nextStep={nextStep}
                  isAtStart={isAtStart}
                />
              )}
            </FlowBuilderFooter>
          </FlowBuilder>
        </Stack>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset='none'
          isCentered
          preserveScrollBarGap
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton
              size='lg'
              as={CloseButton}
            />
            <ModalHeader>
              <Trans>
                Curation Profile Setup Complete
              </Trans>
            </ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <Text color='gray.00' fontSize='md'>
                  <Trans>
                    You've successfully set up your curation profile! Now we'll show you the content based on the
                    preferences you gave us.
                  </Trans>
                </Text>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <LinkButton size='lg' colorScheme='primary' to='/'>
                <Trans>
                  Go home
                </Trans>
              </LinkButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
