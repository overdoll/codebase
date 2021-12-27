import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateBrandButtonFragment$key } from '@//:artifacts/UpdateBrandButtonFragment.graphql'
import type { UpdateBrandButtonMutation } from '@//:artifacts/UpdateBrandButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: UpdateBrandButtonFragment$key
}

const Fragment = graphql`
  fragment UpdateBrandButtonFragment on Post {
    id
    brand {
      id
    }
  }
`

const Mutation = graphql`
  mutation UpdateBrandButtonMutation ($input: UpdatePostBrandInput!) {
    updatePostBrand(input: $input) {
      post {
        id
        brand {
          id
          name
        }
      }
    }
  }
`

export default function UpdateBrandButton ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateBrand, isUpdatingBrand] = useMutation<UpdateBrandButtonMutation>(Mutation)
  const notify = useToast()

  const hasUpdate = state.brand !== data?.brand?.id && state.brand != null

  const isDisabled = state.brand == null

  const goNext = (): void => {
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.CATEGORY
    })
  }

  const onUpdateBrand = (): void => {
    if (state.brand == null) return

    updateBrand({
      variables: {
        input: {
          id: data.id,
          brandId: state.brand
        }
      },
      onCompleted () {
        goNext()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the brand`,
          isClosable: true
        })
      }
    })
  }

  if (hasUpdate) {
    return (
      <Button
        colorScheme='green'
        size='lg'
        isDisabled={isDisabled}
        isLoading={isUpdatingBrand}
        onClick={onUpdateBrand}
      >
        <Trans>
          Save
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={isDisabled}
      onClick={goNext}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
