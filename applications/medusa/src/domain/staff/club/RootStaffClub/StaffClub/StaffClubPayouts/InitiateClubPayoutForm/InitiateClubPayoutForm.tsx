import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { InitiateClubPayoutFormMutation } from '@//:artifacts/InitiateClubPayoutFormMutation.graphql'
import { InitiateClubPayoutFormFragment$key } from '@//:artifacts/InitiateClubPayoutFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import DepositDateInput from './DepositDateInput/DepositDateInput'

interface Props {
  query: InitiateClubPayoutFormFragment$key
}

interface FormValues {
  depositDate: string
}

const Fragment = graphql`
  fragment InitiateClubPayoutFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation InitiateClubPayoutFormMutation($input: InitiateClubPayoutInput!) {
    initiateClubPayout(input: $input) {
      club {
        id
        payouts {
          edges {
            node {
              id
              status
              depositDate
            }
          }
        }
      }
    }
  }
`

export default function InitiateClubPayoutForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<InitiateClubPayoutFormMutation>(Mutation)

  const schema = Joi.object({
    depositDate: Joi.date()
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
          clubId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully initiated payout`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error initiating a payout`
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
          id='depositDate'
          size='md'
        >
          <InputHeader>
            <Trans>
              Deposit Date
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
            Confirm Initiate Payout
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
