/**
 * @flow
 */

import { graphql, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  SimpleGrid,
  AlertDescription,
  AlertIcon,
  Flex,
  Text,
  Code,
  ButtonGroup,
  useToast,
  Heading,
  Skeleton,
  Stack
} from '@chakra-ui/react'
import fileDownload from 'js-file-download'
import Button from '@//:modules/form/Button'
import Icon from '@//:modules/content/Icon/Icon'
import { DownloadArrow } from '../../../../../../assets/icons/interface'
import type { RecoveryCodesSetupQuery } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import type { RecoveryCodesSetupMutation } from '@//:artifacts/RecoveryCodesSetupMutation.graphql'
import CopyToClipboardButton from '../../../../../components/ContentHints/CopyToClipboardButton/CopyToClipboardButton'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  query: RecoveryCodesSetupQuery
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

export default function RecoveryCodesSetup (props: Props): Node {
  const data = usePreloadedQuery<RecoveryCodesSetupQuery>(
    RecoveryCodesSetupQueryGQL,
    props.query
  )

  const [generateCodes, isGeneratingCodes] = useMutation<RecoveryCodesSetupMutation>(
    RecoveryCodesListMutationGQL
  )

  const [t] = useTranslation('configure')

  const notify = useToast()

  const recoveryCodes = data?.viewer.recoveryCodes

  const plainRecoveryCodes = recoveryCodes.map((item) => {
    return `${item.code}\r\n`
  }).join('')

  const onDownloadCodes = () => {
    fileDownload(plainRecoveryCodes, `${t('recovery_codes.exists.download.file_name')}.txt`)
    notify({
      status: 'info',
      duration: 3000,
      title: t('recovery_codes.exists.download.success'),
      isClosable: true
    })
  }

  const onGenerateCodes = () => {
    generateCodes(
      {
        onCompleted () {
          notify({
            status: 'success',
            title: t('recovery_codes.generate.query.success'),
            isClosable: true
          })
        },
        onError (data) {
          console.log(data)
          notify({
            status: 'error',
            title: t('recovery_codes.generate.query.error'),
            isClosable: true
          })
        },
        updater: (store) => {
          const node = store.get(data.viewer.__id)
          const payload = store.getRootField('generateAccountMultiFactorRecoveryCodes').getLinkedRecords('accountMultiFactorRecoveryCodes')
          node.setLinkedRecords(payload, 'recoveryCodes')

          const viewer = store.getRoot().getLinkedRecord('viewer').getLinkedRecord('multiFactorSettings')
          viewer.setValue(true, 'recoveryCodesGenerated')
        }
      }
    )
  }

  // Return a placeholder to generate recovery codes if you don't have any
  if (recoveryCodes.length < 1) {
    return (
      <>
        <Flex direction='column' align='center'>
          <Alert mb={3} status='warning'>
            <AlertIcon />
            <AlertDescription>
              {t('recovery_codes.empty.alert')}
            </AlertDescription>
          </Alert>
          <Button
            isLoading={isGeneratingCodes} onClick={onGenerateCodes} colorScheme='gray'
            size='lg'
          >{t('recovery_codes.empty.button')}
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <Stack>
      <SmallBackgroundBox bg='gray.900'>
        <Stack spacing={4}>
          <Text fontSize='lg' color='gray.00'>{t('recovery_codes.exists.title')}</Text>
          <Alert status='warning'>
            <Flex align='center' direction='column'>
              <AlertIcon mb={2} />
              <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                {t('recovery_codes.exists.alert')}
              </AlertDescription>
            </Flex>
          </Alert>
          <SimpleGrid columns={2} spacing={4}>
            {recoveryCodes.map((item, index) => {
              return (
                <Flex h={8} position='relative' justify='center' align='center' key={index}>
                  {isGeneratingCodes
                    ? <Skeleton w='100%' h='100%' />
                    : <Code
                        data-cy='recovery-code'
                        colorScheme='gray'
                        fontSize='lg'
                      >{item.code}
                    </Code>}
                </Flex>
              )
            })}
          </SimpleGrid>
          <Flex justify='center'>
            <ButtonGroup spacing={12}>
              <CopyToClipboardButton>
                {t('recovery_codes.exists.copy.button')}
              </CopyToClipboardButton>
              <Button
                onClick={onDownloadCodes}
                rightIcon={<Icon w={3} h={3} icon={DownloadArrow} fill='gray.100' />} size='sm'
              >{t('recovery_codes.exists.download.button')}
              </Button>
            </ButtonGroup>
          </Flex>
        </Stack>
      </SmallBackgroundBox>

      <Flex align='flex-start' direction='column'>
        <Heading fontSize='lg' color='gray.00'>{t('recovery_codes.exists.generate.title')}</Heading>
        <Text mb={2} fontSize='sm' color='gray.100'>{t('recovery_codes.exists.generate.description')}</Text>
        <Button
          isLoading={isGeneratingCodes} onClick={onGenerateCodes} colorScheme='gray'
          size='sm'
        >{t('recovery_codes.empty.button')}
        </Button>
      </Flex>
    </Stack>
  )
}
