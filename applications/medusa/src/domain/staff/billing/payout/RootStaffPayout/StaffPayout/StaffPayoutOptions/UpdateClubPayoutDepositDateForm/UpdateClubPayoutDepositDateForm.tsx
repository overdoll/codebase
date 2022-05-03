import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { UpdateClubPayoutDepositDateFormMutation } from '@//:artifacts/UpdateClubPayoutDepositDateFormMutation.graphql'
import {
  UpdateClubPayoutDepositDateFormFragment$key
} from '@//:artifacts/UpdateClubPayoutDepositDateFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import DepositDateInput
  from '../../../../../../club/RootStaffClub/StaffClub/StaffClubPayouts/InitiateClubPayoutForm/DepositDateInput/DepositDateInput'
import GenericDate from '../../../../../../../../common/validation/GenericDate'

interface Props {
  query: UpdateClubPayoutDepositDateFormFragment$key
}

interface FormValues {
  newDate: Date
}

const Fragment = graphql`
  fragment UpdateClubPayoutDepositDateFormFragment on ClubPayout {
    id
  }
`

const Mutation = graphql`
  mutation UpdateClubPayoutDepositDateFormMutation($input: UpdateClubPayoutDepositDateInput!) {
    updateClubPayoutDepositDate(input: $input) {
      clubPayout {
        id
        depositDate
      }
    }
  }
`

export default function UpdateClubPayoutDepositDateForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<UpdateClubPayoutDepositDateFormMutation>(Mutation)

  const schema = Joi.object({
    newDate: GenericDate()
  })

  const notify = useToast()

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          payoutId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated deposit date`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the deposit date`
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
      <Stack spacing={4}>
        <FormInput
          id='newDate'
          size='md'
        >
          <InputHeader>
            <Trans>
              New Date
            </Trans>
          </InputHeader>
          <DepositDateInput />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='green'
        >
          <Trans>
            Update Deposit Date
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
