/**
 * @flow
 */

import {
  Box,
  Button,
  CloseButton,
  Flex,
  SlideFade,
  Text,
  Heading,
  Stack,
  Badge,
  Alert,
  AlertIcon,
  AlertDescription, useToast,
  Divider
} from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AuditInspectFragment$key } from '@//:artifacts/AuditInspectFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import CopyToClipboardText from '../../../../../components/CopyToClipboardText/CopyToClipboardText'
import AuditPost from './AuditPost/AuditPost'
import RotateBack from '@streamlinehq/streamlinehq/img/streamline-bold/design/rotate/rotate-back.svg'
import { useMutation } from 'react-relay/hooks'
import type { AuditInspectMutation } from '@//:artifacts/AuditInspectMutation.graphql'

type Props = {
  auditLog: AuditInspectFragment$key,
  selected: boolean,
  onClose: () => void,
}

const AuditInspectFragmentGQL = graphql`
  fragment AuditInspectFragment on PostAuditLog {
    id
    infractionId
    reason
    notes
    reverted
    reversibleUntil
    action
    ...AuditPostFragment
  }
`

const RevertAuditLogGQL = graphql`
  mutation AuditInspectMutation($input: RevertPostAuditLogInput!) {
    revertPostAuditLog(input: $input) {
      postAuditLog {
        id
        reverted
      }
    }
  }
`

export default function AuditInspect ({ auditLog, selected, onClose }: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(AuditInspectFragmentGQL, auditLog)

  const [revertPost, isRevertingPost] = useMutation<AuditInspectMutation>(
    RevertAuditLogGQL
  )

  const notify = useToast()

  const revertLog = () => {
    revertPost({
      variables: {
        input: {
          postAuditLogId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('history.inspect.revert.query.success'),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('history.inspect.revert.query.failure'),
          isClosable: true
        })
      }
    })
  }

  const canRevert = new Date(data?.reversibleUntil) > new Date()

  return (
    <>
      <Flex display={selected ? 'flex' : 'none'} mb='450px' />
      <Flex mr={2} boxSizing='border-box' position='fixed' bottom={0} w={['full', 'sm', 'md', 'lg']}>
        <SlideFade style={{ width: '100%' }} direction='bottom' in={selected}>
          {data &&
            <Box borderTopWidth={2} borderTopRadius={10} p={4} boxShadow='sm' bg='gray.800'>
              <Flex mb={2} align='center' justify='space-between' w='100%'>
                <Flex justify='center' direction='row'>
                  <CopyToClipboardText text={data.id}>
                    {t('history.inspect.copy')}
                  </CopyToClipboardText>
                </Flex>
                <CloseButton onClick={onClose} />
              </Flex>
              {data.reverted &&
                <Alert borderRadius={5} mb={2} status='info'>
                  <AlertIcon />
                  <AlertDescription fontSize='sm'>
                    {t('history.inspect.revert.alert.reverted')}
                  </AlertDescription>
                </Alert>}
              {(!canRevert && !data.reverted) &&
                <Alert borderRadius={5} mb={2} status='info'>
                  <AlertIcon />
                  <AlertDescription fontSize='sm'>
                    {t('history.inspect.revert.alert.expired')}
                  </AlertDescription>
                </Alert>}
              <Stack spacing={2}>
                <Box>
                  <Heading color='gray.00' size='md'>{t('history.inspect.status')}</Heading>
                  <Flex align='center' justify='space-between'>
                    <Badge
                      fontSize='sm'
                      colorScheme={data.action === 'Approved' ? 'green' : 'orange'}
                    >{data.action}
                    </Badge>
                    <Button
                      rightIcon={<Icon w={4} h={4} icon={RotateBack} fill='blue.300' />} size='md' variant='ghost'
                      colorScheme='blue' disabled={data.reverted || !canRevert} isLoading={isRevertingPost}
                      onClick={revertLog}
                    >
                      {t('history.inspect.revert.button.action')}
                    </Button>
                  </Flex>
                </Box>
                {data.notes &&
                  <Box>
                    <Heading mb={2} color='gray.100' size='sm'>{t('history.inspect.note')}</Heading>
                    <Text>{data.notes}</Text>
                  </Box>}
                <Divider />
                <AuditPost auditLog={data} />
              </Stack>
            </Box>}
        </SlideFade>
      </Flex>
    </>
  )
}
