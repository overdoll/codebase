/**
 * @flow
 */

import { useFragment, usePreloadedQuery, graphql, useMutation } from 'react-relay/hooks'
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
  useToast
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

type Props = {
  data: RecoveryCodesListFragment$key
}

const RecoveryCodesListFragmentGQL = graphql`
  fragment RecoveryCodesListFragment on Account {
    recoveryCodes {
      __id
      code
    }
  }
`

const RecoveryCodesListMutationGQL = graphql`
  mutation RecoveryCodesListMutation ( $connections: [ID!]!) {
    generateAccountMultiFactorRecoveryCodes {
      accountMultiFactorRecoveryCodes @appendNode(connections: $connections, edgeTypeName: "RecoveryCodesEdge") {
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

  const plainRecoveryCodes = data.recoveryCodes.map((item) => {
    return item.code + '\r\n'
  }).join('')

  const onDownloadCodes = () => {
    fileDownload(plainRecoveryCodes, `${t('recovery_codes.exists.download.file_name')}.txt`)
    notify({
      status: 'info',
      title: t('recovery_codes.exists.download.success'),
      isClosable: true
    })
  }

  const onGenerateCodes = () => {
    generateCodes(
      {
        variables: {
          connections: [data?.recoveryCodes?.__id]
        },
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
        }
      }
    )
  }

  // Return a placeholder to generate recovery codes if you don't have any
  if (data.recoveryCodes.length < 1) {
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
      <SimpleGrid columns={2} spacing={4} m={3}>
        {data.recoveryCodes.map((item, index) => {
          return (
            <Flex align='center' key={index}>
              <Icon
                icon={InterfaceGeometricCircle} mr={2} w={1} h={1}
                fill='gray.200'
              />
              <Text color='gray.100' fontSize='lg'>{item.code}</Text>
            </Flex>
          )
        })}
      </SimpleGrid>
      <Flex justify='center' m={3}>
        <ButtonGroup spacing={12}>
          <CopyToClipboardText
            w={28} variant='solid'
            size='sm'
            text={plainRecoveryCodes}
          >{t('recovery_codes.exists.copy.button')}
          </CopyToClipboardText>
          <Button
            onClick={onDownloadCodes}
            leftIcon={<Icon w={3} h={3} icon={DownloadDashArrow} fill='gray.100' />} size='sm'
            w={28}
          >{t('recovery_codes.exists.download.button')}
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}
