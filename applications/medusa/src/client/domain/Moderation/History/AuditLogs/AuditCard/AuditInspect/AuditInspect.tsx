import { Stack, Text, useToast } from '@chakra-ui/react'
import type { AuditInspectFragment$key } from '@//:artifacts/AuditInspectFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { useMutation } from 'react-relay/hooks'
import type { AuditInspectMutation } from '@//:artifacts/AuditInspectMutation.graphql'
import PostPreview from '../../../../Queue/Posts/PostPreview/PostPreview'
import Button from '@//:modules/form/Button/Button'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'

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
          title: t`This audit log was reverted. The post should appear back in your queue shortly.`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error reverting the audit log`,
          isClosable: true
        })
      }
    })
  }

  const canRevert = new Date(data?.reversibleUntil as string) > new Date() && !data.reverted

  return (
    <Stack spacing={3}>
      {data.reverted
        ? (
          <SmallBackgroundBox align='center' justify='center' bg='purple.50'>
            <Text textAlign='center' color='purple.500' fontSize='2xl' fontFamily='mono'>
              <Trans>
                REVERTED
              </Trans>
            </Text>
            <Text textAlign='center'>
              <Trans>
                Originally {data.action}
              </Trans>
            </Text>
          </SmallBackgroundBox>
          )
        : (
          <SmallBackgroundBox
            bg={data.action === 'APPROVED' ? 'green.50' : 'orange.50'}
            alignContent='center'
            justifyContent='center'
          >
            <Text
              textAlign='center'
              color={data.action === 'APPROVED' ? 'green.500' : 'orange.400'}
              fontSize='2xl'
              fontFamily='mono'
            >
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
          <Trans>
            Revert Decision
          </Trans>
        </Button>}
    </Stack>
  )
}
