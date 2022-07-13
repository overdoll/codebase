import { Tooltip } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  SupporterPostContentUploadButtonFragment$key
} from '@//:artifacts/SupporterPostContentUploadButtonFragment.graphql'
import type {
  SupporterPostContentUploadButtonPostFragment$key
} from '@//:artifacts/SupporterPostContentUploadButtonPostFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar, PremiumStarHollow } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: SupporterPostContentUploadButtonFragment$key
  postQuery: SupporterPostContentUploadButtonPostFragment$key
}

const Fragment = graphql`
  fragment SupporterPostContentUploadButtonFragment on PostContent {
    isSupporterOnly
    resource {
      id
    }
    ...ResourceInfoFragment
  }
`

const PostFragment = graphql`
  fragment SupporterPostContentUploadButtonPostFragment on Post {
    id
    ...ResourceInfoFragment
  }
`

const Mutation = graphql`
  mutation SupporterPostContentUploadButtonMutation($input: UpdatePostContentIsSupporterOnlyInput!) {
    updatePostContentIsSupporterOnly(input: $input) {
      post {
        id
        reference
        content {
          viewerCanViewSupporterOnlyContent
          isSupporterOnly
          resource {
            id
          }
        }
      }
    }
  }
`

export default function SupporterPostContentUploadButton ({
  query,
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const [supporterContent, isSupportingContent] = useMutation(Mutation)

  const { i18n } = useLingui()

  const notify = useToast()

  const onSupporterContent = (): void => {
    supporterContent({
      variables: {
        input: {
          id: postData.id,
          contentIds: [data.resource.id],
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

  return (
    <Tooltip
      placement='bottom'
      label={data.isSupporterOnly
        ? (
          <Trans>
            Un-mark this content as Supporter Only
          </Trans>
          )
        : (
          <Trans>
            Mark this content as Supporter Only
          </Trans>)}
    >
      <IconButton
        aria-label={i18n._(t`Supporter Only`)}
        borderRadius='xl'
        size='lg'
        isLoading={isSupportingContent}
        variant='ghost'
        icon={(
          <Icon
            p={2}
            icon={data.isSupporterOnly ? PremiumStar : PremiumStarHollow}
            fill={data.isSupporterOnly ? 'orange.300' : 'gray.200'}
            h='100%'
            w='100%'
          />)}
        onClick={onSupporterContent}
      />
    </Tooltip>
  )
}
