/**
 * @flow
 */

import {
  Box,
  Flex,
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
import RotateBack from '@streamlinehq/streamlinehq/img/streamline-bold/design/rotate/rotate-back.svg'
import { useMutation } from 'react-relay/hooks'
import type { AuditInspectMutation } from '@//:artifacts/AuditInspectMutation.graphql'
import PostPreview from '../../../../Queue/Posts/PostPreview/PostPreview'
import Button from '@//:modules/form/Button'

type Props = {
  auditLog: AuditInspectFragment$key,
}

const AuditInspectFragmentGQL = graphql`
  fragment AuditInspectFragment on PostAuditLog {
    id
    notes
    reverted
    reversibleUntil
    action
    post {
      ...PostPreviewFragment
    }
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

export default function AuditInspect ({ auditLog }: Props): Node {
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
      <Flex direction='column' p={4}>
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
          <PostPreview post={data.post} />
        </Stack>
      </Flex>
      <Box pl={1} pr={1}>
        <Text fontSize='xs' color='gray.500'>
          {data.id}
        </Text>
      </Box>
    </>

  )
}
