import { Stack, Text } from '@chakra-ui/react'
import type { AuditInspectFragment$key } from '@//:artifacts/AuditInspectFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import PostPreview from '../../../../../post-queue/RootPostModerationQueue/PostModerationQueue/PostPreview/PostPreview'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  auditLog: AuditInspectFragment$key
}

const AuditInspectFragmentGQL = graphql`
  fragment AuditInspectFragment on PostAuditLog {
    notes
    action
    post {
      ...PostPreviewFragment
    }
  }
`

export default function AuditInspect ({ auditLog }: Props): JSX.Element {
  const data = useFragment(AuditInspectFragmentGQL, auditLog)

  return (
    <Stack spacing={3}>
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
      <PostPreview query={data.post} />
    </Stack>
  )
}
