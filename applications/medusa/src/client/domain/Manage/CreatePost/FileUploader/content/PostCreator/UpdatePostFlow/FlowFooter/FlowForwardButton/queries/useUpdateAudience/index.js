/**
 * @flow
 */

import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { useUpdateAudienceFragment$key } from '@//:artifacts/useUpdateAudienceFragment.graphql'
import { graphql, useMutation } from 'react-relay/hooks'
import type useUpdateAudienceMutation from '@//:artifacts/useUpdateAudienceMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useUpdateAudienceFragment$key
}

const Fragment = graphql`
  fragment useUpdateAudienceFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useUpdateAudienceMutation ($input: UpdatePostAudienceInput!) {
    updatePostAudience(input: $input) {
      post {
        id
        audience {
          id
          title
        }
      }
    }
  }
`

export default function useUpdateAudience ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [updateAudience, isUpdatingAudience] = useMutation<useUpdateAudienceMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onUpdateAudience = () => {
    updateAudience({
      variables: {
        input: {
          id: data.id,
          audienceId: state.audience
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.STEP, value: STEPS.BRAND })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.audience.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onUpdateAudience, isUpdatingAudience]
}
