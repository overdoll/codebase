import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminLockAccountFormMutation } from '@//:artifacts/AdminLockAccountFormMutation.graphql'
import { AdminLockAccountFormFragment$key } from '@//:artifacts/AdminLockAccountFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import GenericDate from '../../../../../validation/GenericDate'
import LockDurationSelect from './LockDurationSelect/LockDurationSelect'

interface Props {
  query: AdminLockAccountFormFragment$key
}

interface AccountValues {
  endTime: Date
}

const Fragment = graphql`
  fragment AdminLockAccountFormFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminLockAccountFormMutation($input: LockAccountInput!) {
    lockAccount(input: $input) {
      account {
        id
        lock {
          expires
        }
      }
    }
  }
`

export default function AdminLockAccountForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminLockAccountFormMutation>(Mutation)

  const schema = Joi.object({
    endTime: GenericDate()
  })

  const notify = useToast()

  const methods = useForm<AccountValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          accountID: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully locked account until ${formValues.endTime}`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error locking the account`
        })
      }
    }
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={2}>
        <FormInput
          id='endTime'
          size='md'
        >
          <InputHeader>
            <Trans>
              Duration of Lock
            </Trans>
          </InputHeader>
          <LockDurationSelect />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='orange'
        >
          <Trans>
            Lock Account
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
