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
import TotpAppDownloadStep from './TotpAppDownloadStep/TotpAppDownloadStep'
import { Barcode, MobilePhone, QrCode } from '@//:assets/icons/interface'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

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
      title: 'Download App',
      icon: MobilePhone
    },
    code: {
      title: 'Scan Code',
      icon: QrCode
    },
    activate: {
      title: 'Enter Code',
      icon: Barcode
    }
  }

  const generateTotpSetup = (): void => {
    generateTotp({
      variables: {},
      onCompleted (data) {
        setTotp(data)
      },
      onError () {
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
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
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
            <LinkButton size='lg' colorScheme='green' to='/settings/security'>
              <Trans>
                Back to settings
              </Trans>
            </LinkButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
