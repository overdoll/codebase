import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  ButtonGroup,
  Code,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import fileDownload from 'js-file-download'
import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/Icon/Icon'
import { DownloadArrow } from '@//:assets/icons/interface'
import type { RecoveryCodesSetupQuery } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import type { RecoveryCodesSetupMutation } from '@//:artifacts/RecoveryCodesSetupMutation.graphql'
import CopyToClipboardButton from '../../../../../components/ContentHints/CopyToClipboardButton/CopyToClipboardButton'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface Props {
  query: PreloadedQuery<RecoveryCodesSetupQuery>
}

const RecoveryCodesSetupQueryGQL = graphql`
  query RecoveryCodesSetupQuery {
    viewer {
      __id
      recoveryCodes {
        __id
        code
      }
      multiFactorSettings {
        __typename
      }
    }
  }
`

const RecoveryCodesListMutationGQL = graphql`
  mutation RecoveryCodesSetupMutation {
    generateAccountMultiFactorRecoveryCodes {
      accountMultiFactorRecoveryCodes {
        __id
        code
      }
    }
  }
`

export default function RecoveryCodesSetup (props: Props): JSX.Element | null {
  const data = usePreloadedQuery<RecoveryCodesSetupQuery>(
    RecoveryCodesSetupQueryGQL,
    props.query
  )

  const [generateCodes, isGeneratingCodes] = useMutation<RecoveryCodesSetupMutation>(
    RecoveryCodesListMutationGQL
  )

  const notify = useToast()
  const { i18n } = useLingui()

  const recoveryCodes = data?.viewer?.recoveryCodes

  if (recoveryCodes == null) return null

  const plainRecoveryCodes = recoveryCodes.map((item) => {
    return `${item.code}\r\n`
  }).join('')

  const onDownloadCodes = (): void => {
    fileDownload(plainRecoveryCodes, `${t`overdoll-recovery-codes`}.txt`)
    notify({
      status: 'info',
      duration: 3000,
      title: t`Saving your recovery codes...`,
      isClosable: true
    })
  }

  const onGenerateCodes = (): void => {
    generateCodes({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`Recovery codes successfully generated`,
          isClosable: true
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error generating recovery codes`,
          isClosable: true
        })
      },
      updater: (store) => {
        const viewerId = data?.viewer?.__id

        if (viewerId == null) return

        const node = store.get(viewerId)

        if (node != null) {
          const payload = store.getRootField('generateAccountMultiFactorRecoveryCodes').getLinkedRecords('accountMultiFactorRecoveryCodes')
          node.setLinkedRecords(payload, 'recoveryCodes')

          const multiFactorSettings = node.getLinkedRecord('multiFactorSettings')

          if (multiFactorSettings != null) {
            multiFactorSettings.setValue(true, 'recoveryCodesGenerated')
          }
        }
      }
    })
  }

  // Return a placeholder to generate recovery codes if you don't have any
  if (recoveryCodes.length < 1) {
    return (
      <>
        <Flex direction='column' align='center'>
          <Alert mb={3} status='warning'>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                No recovery codes were generated for this account yet
              </Trans>
            </AlertDescription>
          </Alert>
          <Button
            isLoading={isGeneratingCodes}
            onClick={onGenerateCodes}
            colorScheme='gray'
            size='lg'
          >
            <Trans>
              Generate Recovery Codes
            </Trans>
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <Stack>
      <SmallBackgroundBox bg='gray.900'>
        <Stack spacing={4}>
          <Text fontSize='lg' color='gray.00'>
            <Trans>
              Your recovery codes
            </Trans>
          </Text>
          <Alert status='warning'>
            <Flex align='center' direction='column'>
              <AlertIcon mb={2} />
              <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                <Trans>
                  Make sure you save these codes in a safe place. If you lose access to your device and the codes, you
                  will be permanently locked out of your account.
                </Trans>
              </AlertDescription>
            </Flex>
          </Alert>
          <SimpleGrid columns={2} spacing={4}>
            {recoveryCodes.map((item, index) => {
              return (
                <Flex h={8} position='relative' justify='center' align='center' key={index}>
                  {isGeneratingCodes
                    ? <Skeleton w='100%' h='100%' />
                    : (
                      <Code
                        data-cy='recovery-code'
                        colorScheme='gray'
                        fontSize='lg'
                      >
                        {item.code}
                      </Code>
                      )}
                </Flex>
              )
            })}
          </SimpleGrid>
          <Flex justify='center'>
            <ButtonGroup spacing={12}>
              <CopyToClipboardButton>
                {i18n._(t`Copy`)}
              </CopyToClipboardButton>
              <Button
                onClick={onDownloadCodes}
                rightIcon={<Icon w={3} h={3} icon={DownloadArrow} fill='gray.100' />}
                size='sm'
              >
                <Trans>
                  Download
                </Trans>
              </Button>
            </ButtonGroup>
          </Flex>
        </Stack>
      </SmallBackgroundBox>

      <Flex align='flex-start' direction='column'>
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Generate new recovery codes
          </Trans>
        </Heading>
        <Text mb={2} fontSize='sm' color='gray.100'>
          <Trans>
            Generating a new set of recovery codes will invalidate your old codes, meaning you will need to save them
            again.
          </Trans>
        </Text>
        <Button
          isLoading={isGeneratingCodes}
          onClick={onGenerateCodes}
          colorScheme='gray'
          size='sm'
        >
          <Trans>
            Generate Recovery Codes
          </Trans>
        </Button>
      </Flex>
    </Stack>
  )
}
