/**
 * @flow
 */

import type { Uppy } from '@uppy/core';
import type { Dispatch, State } from '@//:types/upload';
import type { useUpdateBrandFragment$key } from '@//:artifacts/useUpdateBrandFragment.graphql';
import { graphql, useMutation } from 'react-relay/hooks';
import type useUpdateBrandMutation from '@//:artifacts/useUpdateBrandMutation.graphql';
import { useFragment } from 'react-relay';
import { EVENTS, STEPS } from '../../../../../../../constants/constants';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useUpdateBrandFragment$key
}

const Fragment = graphql`
  fragment useUpdateBrandFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useUpdateBrandMutation ($input: UpdatePostBrandInput!) {
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

export default function useUpdateBrand ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [updateBrand, isUpdatingBrand] = useMutation<useUpdateBrandMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onUpdateBrand = () => {
    updateBrand({
      variables: {
        input: {
          id: data.id,
          brandId: state.brand
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.STEP, value: STEPS.CATEGORY })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.brand.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onUpdateBrand, isUpdatingBrand]
}
