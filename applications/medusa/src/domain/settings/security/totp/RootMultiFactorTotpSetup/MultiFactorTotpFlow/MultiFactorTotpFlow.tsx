import { graphql, useMutation } from 'react-relay/hooks'
import { useEffect, useState } from 'react'
import type { MultiFactorTotpFlowMutation } from '@//:artifacts/MultiFactorTotpFlowMutation.graphql'
import { Heading, Stack, Text, useDisclosure } from '@chakra-ui/react'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderHeader,
  FlowBuilderProgress,
  PostPlaceholder
} from '@//:modules/content/PageLayout'
import ErrorFallback from '@//:modules/content/Placeholder/Fallback/ErrorFallback/ErrorFallback'
import { Trans } from '@lingui/macro'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import TotpQrCodeStep from './TotpQrCodeStep/TotpQrCodeStep'
import TotpActivateStep from './TotpActivateStep/TotpActivateStep'
import TotpAppDownloadStep from './TotpAppDownloadStep/TotpAppDownloadStep'
import { Barcode, MobilePhone, QrCode } from '@//:assets/icons/interface'
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
    onOpen
  } = useDisclosure()

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

  if (isOpen) {
    return (
      <PostPlaceholder>
        <Stack spacing={8}>
          <Stack spacing={2}>
            <Heading textAlign='center' color='gray.00' fontSize='2xl'>
              <Trans>
                Two-Factor Setup Complete
              </Trans>
            </Heading>
            <Text textAlign='center' color='gray.100' fontSize='sm'>
              <Trans>
                You have completed your two-factor setup and your account login is now secured by an extra step. The
                next time you login, you'll be asked to enter a 6-digit code using the same device you used
                to set this up.
              </Trans>
            </Text>
            <Text textAlign='center' color='gray.100' fontSize='sm'>
              <Trans>
                Please ensure that you have also saved your recovery codes as losing your two-factor device and not
                having access to
                the recovery codes means you will be locked out of your account.
              </Trans>
            </Text>
          </Stack>
          <LinkButton
            href='/settings/security'
            variant='solid'
            colorScheme='green'
            size='lg'
          >
            <Trans>Back to Security Settings</Trans>
          </LinkButton>
        </Stack>
      </PostPlaceholder>
    )
  }

  // If TOTP codes are still generating, show placeholder
  if ((isGeneratingTotp && (totp == null)) || (totp == null)) {
    return (
      <SkeletonStack />
    )
  }

  return (
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
  )
}
