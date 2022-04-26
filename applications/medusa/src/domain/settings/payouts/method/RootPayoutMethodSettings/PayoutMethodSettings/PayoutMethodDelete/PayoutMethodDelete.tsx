import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { useToast } from '@//:modules/content/ThemeComponents'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { PayoutMethodDeleteMutation } from '@//:artifacts/PayoutMethodDeleteMutation.graphql'
import PayoutMethod from '../DisplayPayoutMethod/PayoutMethod/PayoutMethod'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: any
}

const Fragment = graphql`
  fragment PayoutMethodDeleteFragment on AccountPayoutMethod {
    ...on AccountPaxumPayoutMethod {
      id
    }
    ...PayoutMethodFragment
  }
`

const Mutation = graphql`
  mutation PayoutMethodDeleteMutation($input: DeleteAccountPayoutMethodInput!) {
    deleteAccountPayoutMethod(input: $input) {
      deletedAccountPayoutMethodId
    }
  }
`

export default function PayoutMethodDelete ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isLoading] = useMutation<PayoutMethodDeleteMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          payoutMethodId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Payout method deleted`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error deleting your payout method`
        })
      },
      updater: (store, payload) => {
        if (payload?.deleteAccountPayoutMethod?.deletedAccountPayoutMethodId != null) {
          store.delete(data.id)
        }
      }
    }
    )
  }

  return (
    <Stack spacing={2}>
      <LargeBackgroundBox>
        <PayoutMethod query={data} />
      </LargeBackgroundBox>
      <Button onClick={onSubmit} isLoading={isLoading} size='md' colorScheme='orange'>
        <Trans>
          Delete Payout Method
        </Trans>
      </Button>
    </Stack>
  )
}
