import { Stack, Text, useToast } from '@chakra-ui/react'
import type { AuditInspectFragment$key } from '@//:artifacts/AuditInspectFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-relay/hooks'
import type { AuditInspectMutation } from '@//:artifacts/AuditInspectMutation.graphql'
import PostPreview from '../../../../Queue/Posts/PostPreview/PostPreview'
import Button from '@//:modules/form/Button/Button'
import { LargeBackgroundBox, SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  auditLog: AuditInspectFragment$key
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

export default function AuditInspect ({ auditLog }: Props): JSX.Element {
  const [t] = useTranslation('moderation')

  const data = useFragment(AuditInspectFragmentGQL, auditLog)

  const [revertPost, isRevertingPost] = useMutation<AuditInspectMutation>(
    RevertAuditLogGQL
  )

  const notify = useToast()

  const revertLog = (): void => {
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

  const canRevert = new Date(data?.reversibleUntil as string) > new Date() && !data.reverted

  return (
    <LargeBackgroundBox>
      <Stack spacing={3}>
        {data.reverted
          ? (
            <SmallBackgroundBox bg='purple.50' alignContent='center' justifyContent='center'>
              <Text color='purple.500' fontSize='2xl' fontFamily='mono'>
                {t('history.inspect.revert.action')}
              </Text>
              <Text>{t('history.inspect.revert.description', { action: data.action })}</Text>
            </SmallBackgroundBox>
            )
          : (
            <SmallBackgroundBox
              bg={data.action === 'APPROVED' ? 'green.50' : 'orange.50'}
              alignContent='center'
              justifyContent='center'
            >
              <Text color={data.action === 'APPROVED' ? 'green.500' : 'orange.400'} fontSize='2xl' fontFamily='mono'>
                {data.action}
              </Text>
              {data?.notes != null && <Text>{data.notes}</Text>}
            </SmallBackgroundBox>
            )}
        <PostPreview query={data.post} />
        {canRevert &&
          <Button
            size='md'
            variant='solid'
            colorScheme='purple'
            disabled={data.reverted || !canRevert}
            isLoading={isRevertingPost}
            onClick={revertLog}
          >
            {t('history.inspect.revert.button.action')}
          </Button>}
      </Stack>
    </LargeBackgroundBox>
  )
}
