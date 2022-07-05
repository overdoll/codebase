import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import {
  StaffEnableClubSupporterOnlyPostsButtonFragment$key
} from '@//:artifacts/StaffEnableClubSupporterOnlyPostsButtonFragment.graphql'
import {
  StaffEnableClubSupporterOnlyPostsButtonMutation
} from '@//:artifacts/StaffEnableClubSupporterOnlyPostsButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: StaffEnableClubSupporterOnlyPostsButtonFragment$key
}

const Fragment = graphql`
  fragment StaffEnableClubSupporterOnlyPostsButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffEnableClubSupporterOnlyPostsButtonMutation($input: EnableClubSupporterOnlyPostsInput!) {
    enableClubSupporterOnlyPosts(input: $input) {
      club {
        id
        canCreateSupporterOnlyPosts
      }
    }
  }
`

export default function StaffEnableClubSupporterOnlyPostsButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffEnableClubSupporterOnlyPostsButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          clubId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully enabled supporter only posts for this club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error enabling supporter only posts for this club`
        })
      }
    }
    )
  }

  return (
    <Stack spacing={2}>
      <Alert status='info'>
        <AlertIcon />
        <AlertDescription>
          <Trans>
            The club will have to post at least one piece of exclusive supporter content in order to be able to collect
            subscriptions.
          </Trans>
        </AlertDescription>
      </Alert>
      <Button
        isLoading={isInFlight}
        onClick={onSubmit}
        w='100%'
        size='md'
        colorScheme='green'
      >
        <Trans>
          Enable Supporter Only Posts
        </Trans>
      </Button>
    </Stack>

  )
}
