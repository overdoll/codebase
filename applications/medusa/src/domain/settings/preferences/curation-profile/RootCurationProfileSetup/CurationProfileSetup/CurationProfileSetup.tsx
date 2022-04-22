import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationProfileSetupQuery } from '@//:artifacts/CurationProfileSetupQuery.graphql'
import { Trans } from '@lingui/macro'
import { UserHuman } from '@//:assets/icons/navigation'
import {
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
} from '@//:modules/content/PageLayout/FlowBuilder'
import DateOfBirthCurationStep from './DateOfBirthCurationStep/DateOfBirthCurationStep'
import { useHistoryDisclosure } from '@//:modules/hooks'
import AudiencesCurationStep from './AudiencesCurationStep/AudiencesCurationStep'
import CategoriesCurationStep from './CategoriesCurationStep/CategoriesCurationStep'
import CurationStepperFooter from './CurationStepperFooter/CurationStepperFooter'
import type { CurationStepperFooterFragment$key } from '@//:artifacts/CurationStepperFooterFragment.graphql'
import { useUpdateEffect } from 'usehooks-ts'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import {
  ObjectResolver,
  SequenceProvider,
  useSequence,
  ValueResolver
} from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: PreloadedQuery<CurationProfileSetupQuery>
}

interface SequenceProps {
  dateOfBirth: string | null
  audience: {
    [id: string]: {
      title: string
    }
  }
  category: {
    [id: string]: {
      title: string
    }
  }
}

const Query = graphql`
  query CurationProfileSetupQuery {
    viewer {
      curationProfile {
        ...CurationStepperFooterFragment
        completed
        dateOfBirth {
          dateOfBirth
        }
        audience {
          audiences {
            id
            title
          }
        }
        category {
          categories {
            id
            title
          }
        }
      }
    }
  }
`

export default function CurationProfileSetup (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<CurationProfileSetupQuery>(
    Query,
    props.query
  )

  const defaultDateOfBirth = queryData.viewer?.curationProfile.dateOfBirth?.dateOfBirth != null
    ? queryData.viewer?.curationProfile.dateOfBirth?.dateOfBirth
    : null

  const defaultAudience = queryData.viewer?.curationProfile?.audience?.audiences.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {}) as SequenceProps['audience']

  const defaultCategories = queryData.viewer?.curationProfile?.category?.categories.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      name: value.title
    }
  }), {}) as SequenceProps['category']

  const methods = useSequence<SequenceProps>({
    defaultValue: {
      dateOfBirth: defaultDateOfBirth,
      audience: defaultAudience,
      category: defaultCategories
    },
    resolver: {
      dateOfBirth: ValueResolver(),
      audience: ObjectResolver(),
      category: ObjectResolver()
    }
  })

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const steps = ['dateOfBirth', 'audience', 'category']

  const components = {
    dateOfBirth: <DateOfBirthCurationStep />,
    audience: <AudiencesCurationStep />,
    category: <CategoriesCurationStep />
  }

  const headers = {
    dateOfBirth: {
      title: 'Your Age',
      icon: UserHuman
    },
    audience: {
      title: 'Select Audiences',
      icon: ClubMembers
    },
    category: {
      title: 'Select Categories',
      icon: CategoryIdentifier
    }
  }

  useUpdateEffect(() => {
    if (queryData?.viewer?.curationProfile?.completed === true) {
      onOpen()
    }
  }, [queryData?.viewer?.curationProfile?.completed])

  return (
    <SequenceProvider {...methods}>
      <Stack spacing={2}>
        {queryData?.viewer?.curationProfile?.completed === true &&
          <Alert
            status='info'
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
            spacing={4}
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
            <LinkButton size='lg' colorScheme='primary' href='/'>
              <Trans>
                Go home
              </Trans>
            </LinkButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SequenceProvider>
  )
}
