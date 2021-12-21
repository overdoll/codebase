import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateBrandButtonFragment$key } from '@//:artifacts/UpdateBrandButtonFragment.graphql'
import type { UpdateBrandButtonMutation } from '@//:artifacts/UpdateBrandButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'

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

  const [t] = useTranslation('manage')

  const notify = useToast()

  const checkUpdate = (): void => {
    if (state.brand !== data?.brand?.id) {
      onUpdateBrand()
      return
    }
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
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.CATEGORY
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.brand.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={state.brand == null}
      isLoading={isUpdatingBrand}
      onClick={checkUpdate}
    >{t('create_post.flow.steps.footer.forward')}
    </Button>
  )
}
