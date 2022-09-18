import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import { Box, Code, Flex, HStack, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import fileDownload from 'js-file-download'
import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { CopyText, DownloadArrow } from '@//:assets/icons/interface'
import type { RecoveryCodesSetupQuery } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import type { RecoveryCodesSetupMutation } from '@//:artifacts/RecoveryCodesSetupMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: PreloadedQuery<RecoveryCodesSetupQuery>
}

const RecoveryCodesSetupQueryGQL = graphql`
  query RecoveryCodesSetupQuery @preloadable {
    viewer @required(action: THROW) {
      id
      recoveryCodes {
        __id
        code
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

  const recoveryCodes = data.viewer.recoveryCodes

  const plainRecoveryCodes = recoveryCodes.map((item) => {
    return `${item.code}\r\n`
  }).join('')

  const [, onCopy] = useCopyToClipboardWrapper({ text: plainRecoveryCodes })

  const onDownloadCodes = (): void => {
    fileDownload(plainRecoveryCodes, `${t`overdoll-recovery-codes`}.txt`)
    notify({
      status: 'info',
      duration: 3000,
      title: t`Saving your recovery codes...`
    })
  }

  const onGenerateCodes = (): void => {
    generateCodes({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`Recovery codes successfully generated`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error generating recovery codes`
        })
      },
      updater: (store) => {
        const viewerId = data?.viewer?.id

        if (viewerId == null) return

        const node = store.get(viewerId)

        if (node != null) {
          const payload = store.getRootField('generateAccountMultiFactorRecoveryCodes').getLinkedRecords('accountMultiFactorRecoveryCodes')
          node.setLinkedRecords(payload, 'recoveryCodes')
          node.setValue(true, 'recoveryCodesGenerated')
        }
      }
    })
  }

  // Return a placeholder to generate recovery codes if you don't have any
  if (recoveryCodes.length < 1) {
    return (
      <>
        <Flex direction='column' align='center'>
          <Button
            isLoading={isGeneratingCodes}
            onClick={onGenerateCodes}
            colorScheme='teal'
            size='lg'
            w='100%'
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
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Alert status='warning'>
          <Flex align='center' direction='column'>
            <AlertIcon mb={2} />
            <AlertDescription align='center'>
              <Trans>
                Make sure you save these codes in a safe place. If you lose access to your device and the codes, you
                will be permanently locked out of your account.
              </Trans>
            </AlertDescription>
          </Flex>
        </Alert>
        <SimpleGrid columns={2} spacing={4}>
          {recoveryCodes.map((item) => {
            return (
              <Flex px={2} w='100%' h={8} position='relative' justify='center' align='center' key={item.code}>
                {isGeneratingCodes
                  ? <Skeleton w='100%' h='100%' />
                  : (
                    <Code
                      px={3}
                      py={1}
                      borderRadius='base'
                      textAlign='center'
                      fontSize='lg'
                      bg='gray.800'
                      color='teal.300'
                    >
                      {item.code}
                    </Code>
                    )}
              </Flex>
            )
          })}
        </SimpleGrid>
        <HStack spacing={2}>
          <Button
            onClick={onCopy}
            leftIcon={<Icon w={3} h={3} icon={CopyText} fill='inherit' />}
            size='md'
            w='100%'
          >
            <Trans>
              Copy
            </Trans>
          </Button>
          <Button
            onClick={onDownloadCodes}
            leftIcon={<Icon w={3} h={3} icon={DownloadArrow} fill='inherit' />}
            size='md'
            w='100%'
          >
            <Trans>
              Download
            </Trans>
          </Button>
        </HStack>
      </Stack>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Generate new recovery codes
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Generating a new set of recovery codes will invalidate your old codes, meaning you will need to save them
              again.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Button
          isLoading={isGeneratingCodes}
          onClick={onGenerateCodes}
          colorScheme='teal'
          size='lg'
          w='100%'
        >
          <Trans>
            Generate Recovery Codes
          </Trans>
        </Button>
      </Box>
    </Stack>
  )
}
