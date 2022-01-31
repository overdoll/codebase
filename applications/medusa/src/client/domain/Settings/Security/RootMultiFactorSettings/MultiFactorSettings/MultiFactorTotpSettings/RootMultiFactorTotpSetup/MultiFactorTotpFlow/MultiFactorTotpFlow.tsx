import { graphql, useMutation } from 'react-relay/hooks'
import { useEffect, useState } from 'react'
import type { MultiFactorTotpFlowMutation } from '@//:artifacts/MultiFactorTotpFlowMutation.graphql'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text
} from '@chakra-ui/react'
import ExternalLink from '../../../../../../../../components/ContentHints/ExternalLink/ExternalLink'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import SuspenseImage from '@//:modules/operations/SuspenseImage'
import CopyCodeToClipboard from '../../../../../../../../components/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import { Barcode, MobilePhone } from '@//:assets/icons/interface'

import TotpActivationForm from './TotpActivationForm/TotpActivationForm'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import ErrorFallback from '@//:modules/content/Placeholder/Fallback/ErrorFallback/ErrorFallback'
import { Trans } from '@lingui/macro'

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

  useEffect(() => {
    !isSuccessful && generateTotpSetup()
  }, [])

  const [totp, setTotp] = useState<MultiFactorTotpFlowMutation['response'] | null>(null)

  const [hasError, setHasError] = useState(false)

  const [isSuccessful, setIsSuccessful] = useState(false)

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

  // If the two factor method is successfully activated we want to remove the entire flow and replace it with a
  // "success" alert so the user understands the authentication was successful and doesn't try
  // submitting the flow again
  if (isSuccessful) {
    return (
      <Flex justify='center' p={4} borderRadius={5} borderWidth={2} borderColor='gray.800'>
        <Flex direction='column' align='center'>
          <Alert status='success'>
            <Flex align='center' direction='column'>
              <AlertIcon mr={0} mb={2} />
              <AlertDescription align='center' mb={1} lineHeight={5} fontSize='sm'>
                <Trans>
                  You have successfully set up two-factor authentication!
                </Trans>
              </AlertDescription>
              <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                <Trans>
                  The next time you login, you'll be asked to enter another 6-digit code using the same device you used
                  to set this up.
                </Trans>
              </AlertDescription>
            </Flex>
          </Alert>
        </Flex>
      </Flex>
    )
  }

  // If the mutation returns an error, allow the user to run it again
  if (hasError) {
    return (
      <ErrorFallback refetch={generateTotpSetup} />
    )
  }

  // If TOTP codes are still generating, show placeholder
  if ((isGeneratingTotp && (totp == null)) || (totp == null)) {
    return (
      <Flex mt={6} align='center' direction='column' justify='center'>
        <Spinner mb={3} thickness='4' size='lg' color='primary.500' />
        <Heading size='md' color='gray.00'>
          <Trans>
            Generating two-factor flow...
          </Trans>
        </Heading>
      </Flex>
    )
  }

  return (
    <SimpleGrid
      columns={1}
      spacing={2}
    >
      <SmallBackgroundBox p={0}>
        <Flex
          m={2}
          align={{
            base: 'initial',
            md: 'center'
          }}
          direction={{
            base: 'column',
            md: 'row'
          }}
        >
          <Flex m={2} justify='center' align='center'>
            <Box borderRadius={5} h={32} w={32} p={6} bg='gray.900'>
              <Icon icon={MobilePhone} fill='gray.100' />
            </Box>
          </Flex>
          <Box m={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Download an Authenticator App
              </Trans>
            </Heading>
            <Text color='gray.100' fontSize='sm'>
              <Trans>
                Install an authenticator app for your mobile device.
              </Trans>
            </Text>
            <List spacing={1} mt={2}>
              <ListItem>
                <ExternalLink path='https://support.google.com/accounts/answer/1066447'>
                  <Trans>
                    Google Authenticator
                  </Trans>
                </ExternalLink>
              </ListItem>
              <ListItem>
                <ExternalLink path='https://authy.com/features/setup/'>
                  <Trans>
                    Authy
                  </Trans>
                </ExternalLink>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </SmallBackgroundBox>
      <SmallBackgroundBox p={0}>
        <Flex
          align={{
            base: 'initial',
            md: 'center'
          }}
          m={2}
          direction={{
            base: 'column',
            md: 'row'
          }}
        >
          <Flex m={2} justify='center' align='center'>
            <Flex
              h={32}
              w={32}
              borderRadius={5}
              bg='gray.00'
              align='center'
              justify='center'
            >
              <SuspenseImage
                alt='thumbnail'
                src={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.imageSrc}
                fallback={<Skeleton w='100%' h='100%' />}
              />
            </Flex>
          </Flex>
          <Box m={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Scan the QR Code
              </Trans>
            </Heading>
            <Text color='gray.100' fontSize='sm'>
              <Trans>
                Open the authenticator app and scan the image. You must scan the code through the app or it won't work.
              </Trans>
            </Text>
            <Text mt={2} color='gray.100' fontSize='sm'>
              <Trans>
                Alternatively, you can enter the following secret code into the app
              </Trans>
            </Text>
            <CopyCodeToClipboard mt={2}>
              {totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.secret ?? ''}
            </CopyCodeToClipboard>
          </Box>
        </Flex>
      </SmallBackgroundBox>
      <SmallBackgroundBox p={0}>
        <Flex
          m={2}
          align={{
            base: 'initial',
            md: 'center'
          }}
          direction={{
            base: 'column',
            md: 'row'
          }}
        >
          <Flex m={2} justify='center' align='center'>
            <Box borderRadius={5} h={32} w={32} p={6} bg='gray.900'>
              <Icon icon={Barcode} fill='gray.100' />
            </Box>
          </Flex>
          <Box m={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Enter the code
              </Trans>
            </Heading>
            <Text mb={2} color='gray.100' fontSize='sm'>
              <Trans>
                Enter the 6-digit verification code that the authenticator app generated.
              </Trans>
            </Text>
            <TotpActivationForm
              id={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.id as string}
              setIsSuccessful={() => setIsSuccessful(true)}
            />
          </Box>
        </Flex>
      </SmallBackgroundBox>
    </SimpleGrid>
  )
}
