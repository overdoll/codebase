import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import {
  StaffDisableClubSupporterOnlyPostsButtonFragment$key
} from '@//:artifacts/StaffDisableClubSupporterOnlyPostsButtonFragment.graphql'
import {
  StaffDisableClubSupporterOnlyPostsButtonMutation
} from '@//:artifacts/StaffDisableClubSupporterOnlyPostsButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: StaffDisableClubSupporterOnlyPostsButtonFragment$key
}

const Fragment = graphql`
  fragment StaffDisableClubSupporterOnlyPostsButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffDisableClubSupporterOnlyPostsButtonMutation($input: DisableClubSupporterOnlyPostsInput!) {
    disableClubSupporterOnlyPosts(input: $input) {
      club {
        id
        canCreateSupporterOnlyPosts
      }
    }
  }
`

export default function StaffDisableClubSupporterOnlyPostsButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffDisableClubSupporterOnlyPostsButtonMutation>(Mutation)

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
          title: t`Successfully disabled supporter only posts for this club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error disabling supporter only posts for this club`
        })
      }
    }
    )
  }

  return (
    <Stack spacing={2}>
      <Alert status='warning'>
        <AlertIcon />
        <AlertDescription>
          <Trans>
            If the club already posted supporter content, it's encouraged that you have the owner archive the posts with
            supporter content to avoid confusion. In addition, the club won't be able to take any supporter
            subscriptions if they were already able to.
          </Trans>
        </AlertDescription>
      </Alert>
      <Button
        isLoading={isInFlight}
        onClick={onSubmit}
        w='100%'
        size='md'
        colorScheme='orange'
      >
        <Trans>
          Disable Supporter Only Posts
        </Trans>
      </Button>
    </Stack>

  )
}
