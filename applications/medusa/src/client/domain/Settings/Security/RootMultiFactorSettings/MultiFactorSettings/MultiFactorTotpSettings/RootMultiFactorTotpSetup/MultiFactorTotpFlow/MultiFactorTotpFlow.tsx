import { graphql, useMutation } from 'react-relay/hooks'
import { useEffect, useState } from 'react'
import type { MultiFactorTotpFlowMutation } from '@//:artifacts/MultiFactorTotpFlowMutation.graphql'
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
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderHeader,
  FlowBuilderProgress
} from '@//:modules/content/PageLayout'
import ErrorFallback from '@//:modules/content/Placeholder/Fallback/ErrorFallback/ErrorFallback'
import { Trans } from '@lingui/macro'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import TotpQrCodeStep from './TotpQrCodeStep/TotpQrCodeStep'
import TotpActivateStep from './TotpActivateStep/TotpActivateStep'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Link } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'
import TotpAppDownloadStep from './TotpAppDownloadStep/TotpAppDownloadStep'
import { SearchBar } from '@//:assets/icons/navigation'
import { Barcode, MobilePhone } from '@//:assets/icons/interface'

const MultiFactorTotpFlowMutationGQL = graphql`
  mutation MultiFactorTotpFlowMutation {
    generateAccountMultiFactorTotp {
      multiFactorTotp {
        id
        secret
        imageSrc
      }
    }
  }
`

export default function MultiFactorTotpFlow (): JSX.Element {
  const [generateTotp, isGeneratingTotp] = useMutation<MultiFactorTotpFlowMutation>(
    MultiFactorTotpFlowMutationGQL
  )

  const [totp, setTotp] = useState<MultiFactorTotpFlowMutation['response'] | null>(null)

  const [hasError, setHasError] = useState(false)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const steps = ['app', 'code', 'activate']

  const components = {
    app: <TotpAppDownloadStep />,
    code: <TotpQrCodeStep
      secret={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.secret}
      image={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.imageSrc}
          />,
    activate: <TotpActivateStep
      totpId={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.id}
      onSuccess={onOpen}
              />
  }

  const headers = {
    app: {
      title: <Trans>
        Download App
      </Trans>,
      icon: MobilePhone
    },
    code: {
      title: <Trans>
        Scan Code
      </Trans>,
      icon: Barcode
    },
    activate: {
      title: <Trans>
        Enter Code
      </Trans>,
      icon: SearchBar
    }
  }

  const generateTotpSetup = (): void => {
    generateTotp({
      variables: {},
      onCompleted (data) {
        setTotp(data)
      },
      onError (data) {
        setHasError(true)
      }
    })
  }

  useEffect(() => {
    !isOpen && generateTotpSetup()
  }, [])

  // If the mutation returns an error, allow the user to run it again
  if (hasError) {
    return (
      <ErrorFallback refetch={generateTotpSetup} />
    )
  }

  // If TOTP codes are still generating, show placeholder
  if ((isGeneratingTotp && (totp == null)) || (totp == null)) {
    return (
      <SkeletonStack />
    )
  }

  return (
    <>
      <FlowBuilder
        colorScheme='green'
        stepsArray={steps}
        stepsComponents={components}
        stepsHeaders={headers}
      >
        <Stack
          borderRadius='md'
          spacing={3}
          p={4}
          bg='gray.800'
        >
          <FlowBuilderHeader />
          <FlowBuilderProgress />
        </Stack>
        <FlowBuilderBody />

        <FlowBuilderFooter />
      </FlowBuilder>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Trans>
              Two-factor Setup Complete
            </Trans>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Text color='gray.00' fontSize='md'>
                <Trans>
                  The next time you login, you'll be asked to enter another 6-digit code using the same device you used
                  to set this up.
                </Trans>
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Link to='/settings/security'>
              <Button size='lg' colorScheme='green'>
                <Trans>
                  Back to settings
                </Trans>
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
