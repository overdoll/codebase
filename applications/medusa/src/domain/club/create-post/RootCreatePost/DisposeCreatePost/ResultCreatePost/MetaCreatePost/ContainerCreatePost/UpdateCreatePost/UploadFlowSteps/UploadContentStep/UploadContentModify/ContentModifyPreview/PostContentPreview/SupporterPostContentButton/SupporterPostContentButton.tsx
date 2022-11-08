import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { SupporterPostContentButtonFragment$key } from '@//:artifacts/SupporterPostContentButtonFragment.graphql'
import type {
  SupporterPostContentButtonPostFragment$key
} from '@//:artifacts/SupporterPostContentButtonPostFragment.graphql'
import type { SupporterPostContentButtonMutation } from '@//:artifacts/SupporterPostContentButtonMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { PremiumStar } from '@//:assets/icons'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Icon } from '@//:modules/content/PageLayout'
import Button from '@//:modules/form/Button/Button'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { Text } from '@chakra-ui/react'

interface Props {
  query: SupporterPostContentButtonFragment$key
  postQuery: SupporterPostContentButtonPostFragment$key
}

const Fragment = graphql`
  fragment SupporterPostContentButtonFragment on PostContent {
    id
    isSupporterOnly
  }
`

const PostFragment = graphql`
  fragment SupporterPostContentButtonPostFragment on Post {
    id
    club {
      canCreateSupporterOnlyPosts
    }
  }
`

const Mutation = graphql`
  mutation SupporterPostContentButtonMutation($input: UpdatePostContentIsSupporterOnlyInput!) {
    updatePostContentIsSupporterOnly(input: $input) {
      post {
        id
        reference
        content {
          id
          viewerCanViewSupporterOnlyContent
          isSupporterOnly
        }
      }
    }
  }
`

export default function SupporterPostContentButton ({
  query,
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const { state } = useSequenceContext()

  const [supporterContent, isSupportingContent] = useMutation<SupporterPostContentButtonMutation>(Mutation)

  const notify = useToast()

  const onSupporterContent = (): void => {
    supporterContent({
      variables: {
        input: {
          id: postData.id,
          contentIds: [data.id],
          isSupporterOnly: !data.isSupporterOnly
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`Error marking content as supporter only`
        })
      }
    })
  }

  if (!postData.club.canCreateSupporterOnlyPosts && !data.isSupporterOnly) {
    return <></>
  }

  if (postData.club.canCreateSupporterOnlyPosts && !data.isSupporterOnly) {
    if (state.isEditing === true) {
      return (
        <Text maxW={140} textAlign='center' fontSize='sm' color='gray.300'>
          <Trans>
            Cannot create supporter only content when editing
          </Trans>
        </Text>
      )
    }

    return (
      <Button
        onClick={onSupporterContent}
        isLoading={isSupportingContent}
        leftIcon={<Icon w={3} h={3} icon={PremiumStar} fill='gray.100' />}
        size='sm'
        colorScheme='gray'
      >
        <Trans>
          Set Supporter Only
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      onClick={onSupporterContent}
      isLoading={isSupportingContent}
      size='sm'
      variant='solid'
      colorScheme='gray'
    >
      <Trans>
        Set Free
      </Trans>
    </Button>
  )
}
