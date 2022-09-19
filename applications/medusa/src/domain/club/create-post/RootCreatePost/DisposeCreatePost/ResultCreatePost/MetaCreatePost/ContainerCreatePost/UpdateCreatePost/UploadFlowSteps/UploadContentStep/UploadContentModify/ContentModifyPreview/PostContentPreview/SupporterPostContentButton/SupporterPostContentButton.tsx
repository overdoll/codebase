import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { SupporterPostContentButtonFragment$key } from '@//:artifacts/SupporterPostContentButtonFragment.graphql'
import type {
  SupporterPostContentButtonPostFragment$key
} from '@//:artifacts/SupporterPostContentButtonPostFragment.graphql'
import type { SupporterPostContentButtonMutation } from '@//:artifacts/SupporterPostContentButtonMutation.graphql'
import { t } from '@lingui/macro'
import { PremiumStar, PremiumStarHollow } from '@//:assets/icons'
import { useToast } from '@//:modules/content/ThemeComponents'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'

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

  const [supporterContent, isSupportingContent] = useMutation<SupporterPostContentButtonMutation>(Mutation)

  const notify = useToast()

  const { i18n } = useLingui()

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
    return (
      <IconButton
        aria-label={i18n._(t`Set Supporter Only`)}
        onClick={onSupporterContent}
        isLoading={isSupportingContent}
        size='md'
        variant='ghost'
        borderRadius='lg'
        icon={<Icon w={8} h={8} icon={PremiumStarHollow} fill='gray.300' />}
      />
    )
  }

  return (
    <IconButton
      aria-label={i18n._(t`Set Free`)}
      onClick={onSupporterContent}
      isLoading={isSupportingContent}
      size='md'
      variant='ghost'
      borderRadius='lg'
      icon={<Icon w={8} h={8} icon={PremiumStar} fill='green.300' />}
    />
  )
}
