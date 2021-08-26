/**
 * @flow
 */

import { useFragment, usePreloadedQuery, graphql, useMutation, ConnectionHandler } from 'react-relay/hooks'
import type { RecoveryCodesListFragment$key } from '@//:artifacts/RecoveryCodesListFragment.graphql'
import { useTranslation } from 'react-i18next'
import {
  Wrap,
  WrapItem,
  Stack,
  Alert,
  CloseButton,
  SimpleGrid,
  AlertDescription,
  AlertIcon,
  Flex,
  Text,
  Code,
  Box,
  ButtonGroup,
  useToast,
  Heading
} from '@chakra-ui/react'
import fileDownload from 'js-file-download'
import Button from '@//:modules/form/Button'
import type { RecoveryCodesListMutation } from '@//:artifacts/RecoveryCodesListMutation.graphql'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceGeometricCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/geometric-shape/interface-geometric-circle.svg'
import CopyToClipboardText from '../../../../../components/CopyToClipboardText/CopyToClipboardText'
import DownloadDashArrow
  from '@streamlinehq/streamlinehq/img/streamline-bold/internet-networks-servers/upload-download/download-dash-arrow.svg'
import ArrowButtonRight2Alternate
  from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-button-right-2-alternate.svg'
import ArrowButtonRight2
  from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-button-right-2.svg'

type Props = {
  data: RecoveryCodesListFragment$key
}

const RecoveryCodesListFragmentGQL = graphql`
  fragment RecoveryCodesListFragment on Account {
    __id
    recoveryCodes {
      __id
      code
    }
  }
`

const RecoveryCodesListMutationGQL = graphql`
  mutation RecoveryCodesListMutation {
    generateAccountMultiFactorRecoveryCodes {
      accountMultiFactorRecoveryCodes {
        __id
        code
      }
    }
  }
`

export default function RecoveryCodesSetup (props: Props): Node {
  const data = useFragment(RecoveryCodesListFragmentGQL, props.data)

  const [generateCodes, isGeneratingCodes] = useMutation<RecoveryCodesListMutation>(
    RecoveryCodesListMutationGQL
  )

  const [t] = useTranslation('configure')

  const notify = useToast()

  const plainRecoveryCodes = data?.recoveryCodes.map((item) => {
    return item.code + '\r\n'
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
        onError () {
          notify({
            status: 'error',
            title: t('recovery_codes.generate.query.error'),
            isClosable: true
          })
        },
        updater: (store) => {
          const node = store.get(data.__id)
          // const payload = store.getRoot.getLinkedRecord('generateAccountMultiFactorRecoveryCodes')
          // const recoveryCodes = node.getLinkedRecords('recoveryCodes')
          // const newRecoveryCodes = payload.generateAccountMultiFactorRecoveryCodes.accountMultiFactorRecoveryCodes
          // const eeee = [...recoveryCodes, newRecoveryCodes]
          if (data?.recoveryCodes.length > 0) {
            // node.setLinkedRecord(recoveryCodes, 'recoveryCodes')
          }
        }
      }
    )
  }

  // Return a placeholder to generate recovery codes if you don't have any
  if (data?.recoveryCodes.length < 1) {
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
    <>
      <Flex direction='column' borderRadius={5} borderWidth={2} borderColor='gray.700'>
        <Text p={3} fontSize='lg' color='gray.00'>{t('recovery_codes.exists.title')}</Text>
        <Alert borderRadius={0} borderLeftWidth={0} borderRightWidth={0} status='warning'>
          <Flex align='center' direction='column'>
            <AlertIcon mb={2} />
            <AlertDescription align='center' lineHeight={5} fontSize='sm'>
              {t('recovery_codes.exists.alert')}
            </AlertDescription>
          </Flex>
        </Alert>
        <SimpleGrid columns={2} spacing={4} mx={3} mt={6} mb={6}>
          {data?.recoveryCodes.map((item, index) => {
            return (
              <Flex justify='center' align='center' key={index}>
                <Code colorScheme='green' fontSize='lg'>{item.code}</Code>
              </Flex>
            )
          })}
        </SimpleGrid>
        <Flex justify='center' mx={3} mb={3}>
          <ButtonGroup spacing={12}>
            <CopyToClipboardText
              variant='solid'
              size='sm'
              text={plainRecoveryCodes}
            >{t('recovery_codes.exists.copy.button')}
            </CopyToClipboardText>
            <Button
              onClick={onDownloadCodes}
              leftIcon={<Icon w={3} h={3} icon={DownloadDashArrow} fill='gray.100' />} size='sm'
            >{t('recovery_codes.exists.download.button')}
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
      <Flex align='flex-start' direction='column' mt={3}>
        <Heading fontSize='lg' color='gray.00'>{t('recovery_codes.exists.generate.title')}</Heading>
        <Text mb={2} fontSize='sm' color='gray.100'>{t('recovery_codes.exists.generate.description')}</Text>
        <Button
          isLoading={isGeneratingCodes} onClick={onGenerateCodes} colorScheme='gray'
          size='sm'
        >{t('recovery_codes.empty.button')}
        </Button>
      </Flex>
    </>
  )
}
