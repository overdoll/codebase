import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { ArrangeButtonFragment$key } from '@//:artifacts/ArrangeButtonFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import Button from '@//:modules/form/Button/Button'
import { Icon } from '@//:modules/content/PageLayout'
import { CheckMark, RemoveCross, SwapCircle } from '@//:assets/icons'
import { HStack } from '@chakra-ui/react'
import { ArrangeButtonMutation } from '@//:artifacts/ArrangeButtonMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import compareTwoArrayOrders from '@//:modules/support/compareTwoArrayOrders'

interface Props {
  query: ArrangeButtonFragment$key
  isDisabled: boolean
}

const Fragment = graphql`
  fragment ArrangeButtonFragment on Post {
    id
    content {
      id
      __typename
    }
  }
`

const Mutation = graphql`
  mutation ArrangeButtonMutation ($input: UpdatePostContentOrderInput!) {
    updatePostContentOrder(input: $input) {
      post {
        id
        content {
          id
          resource {
            type
            processed
            urls {
              url
              mimeType
            }
          }
        }
      }
    }
  }
`

export default function ArrangeButton ({
  query,
  isDisabled
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateContent, isUpdatingContent] = useMutation<ArrangeButtonMutation>(Mutation)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const notify = useToast()

  const onRearrange = (): void => {
    dispatch({
      type: 'isRearranging',
      value: !(state.isRearranging as boolean),
      transform: 'SET'
    })
  }

  const onSaveOrder = (): void => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          contentIds: state.content
        }
      },
      onCompleted () {
        dispatch({
          type: 'content',
          value: [],
          transform: 'SET'
        })
        onRearrange()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the post content`,
          isClosable: true
        })
      }
    })
  }

  const hasUpdate = (): boolean => {
    const currentContent = data.content.map((item) => item.id)
    // We only check the order because newly added files are committed automatically
    if (state.content === []) return false
    return !compareTwoArrayOrders(currentContent, state.content)
  }

  if (data.content.length < 2) {
    return (
      <></>
    )
  }
  if (state.isRearranging === true) {
    return (
      <HStack justify='space-between'>
        {hasUpdate() && (
          <Button
            onClick={onSaveOrder}
            isLoading={isUpdatingContent}
            colorScheme='green'
            rightIcon={<Icon h={3} w={3} icon={CheckMark} fill='green.900' />}
            w='100%'
          >
            <Trans>
              Save Order
            </Trans>
          </Button>
        )}
        <Button
          isDisabled={isUpdatingContent}
          w='100%'
          onClick={onRearrange}
          rightIcon={<Icon h={3} w={3} icon={RemoveCross} fill='gray.100' />}
        >
          <Trans>
            Cancel
          </Trans>
        </Button>
      </HStack>
    )
  }

  return (
    <Button
      isDisabled={isDisabled}
      onClick={onRearrange}
      rightIcon={<Icon h={3} w={3} icon={SwapCircle} fill='gray.100' />}
    >
      <Trans>
        Rearrange Uploads
      </Trans>
    </Button>
  )
}
