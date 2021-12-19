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
import { useTranslation } from 'react-i18next'
import ExternalLink from '../../../../../components/ContentHints/ExternalLink/ExternalLink'
import Icon from '@//:modules/content/Icon/Icon'
import SuspenseImage from '@//:modules/operations/SuspenseImage'
import CopyCodeToClipboard from '../../../../../components/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import { Barcode, MobilePhone } from '@//:assets/icons/interface'

import TotpSubmissionForm from './TotpSubmissionForm/TotpSubmissionForm'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'

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

  const [t] = useTranslation('configure')

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
        console.log(data)
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
                {t('totp.flow.success.title')}
              </AlertDescription>
              <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                {t('totp.flow.success.description')}
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
        <Heading size='md' color='gray.00'>{t('totp.flow.generating')}</Heading>
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
              {t('totp.flow.app_step.title')}
            </Heading>
            <Text color='gray.100' fontSize='sm'>
              {t('totp.flow.app_step.description')}
            </Text>
            <List spacing={1} mt={2}>
              <ListItem>
                <ExternalLink path='https://support.google.com/accounts/answer/1066447'>
                  {t('totp.flow.app_step.options.google_authenticator')}
                </ExternalLink>
              </ListItem>
              <ListItem>
                <ExternalLink path='https://authy.com/features/setup/'>
                  {t('totp.flow.app_step.options.authy')}
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
              {t('totp.flow.scan_step.title')}
            </Heading>
            <Text color='gray.100' fontSize='sm'>
              {t('totp.flow.scan_step.description')}
            </Text>
            <Text mt={2} color='gray.100' fontSize='sm'>
              {t('totp.flow.scan_step.alternative')}
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
              {t('totp.flow.code_step.title')}
            </Heading>
            <Text mb={2} color='gray.100' fontSize='sm'>
              {t('totp.flow.code_step.description')}
            </Text>
            <TotpSubmissionForm
              id={totp?.generateAccountMultiFactorTotp?.multiFactorTotp?.id as string}
              setIsSuccessful={() => setIsSuccessful(true)}
            />
          </Box>
        </Flex>
      </SmallBackgroundBox>
    </SimpleGrid>
  )
}