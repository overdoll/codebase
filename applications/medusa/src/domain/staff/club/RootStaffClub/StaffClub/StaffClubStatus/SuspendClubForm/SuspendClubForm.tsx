import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { SuspendClubFormMutation } from '@//:artifacts/SuspendClubFormMutation.graphql'
import { SuspendClubFormFragment$key } from '@//:artifacts/SuspendClubFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import LockDurationSelect
  from '../../../../../account/RootStaffAccount/StaffAccount/StaffLockAccount/StaffLockAccountForm/LockDurationSelect/LockDurationSelect'
import GenericDate from '../../../../../../../common/validation/GenericDate'

interface Props {
  query: SuspendClubFormFragment$key
}

interface SuspendClubValues {
  endTime: Date
}

const Fragment = graphql`
  fragment SuspendClubFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation SuspendClubFormMutation($input: SuspendClubInput!) {
    suspendClub(input: $input) {
      club {
        id
        suspension {
          expires
        }
        termination {
          account {
            username
          }
        }
      }
    }
  }
`

export default function SuspendClubForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<SuspendClubFormMutation>(Mutation)

  const schema = Joi.object({
    endTime: GenericDate()
  })

  const notify = useToast()

  const methods = useForm<SuspendClubValues>({
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
          title: t`Successfully suspended club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error suspending the club`
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
          id='endTime'
          size='md'
        >
          <InputHeader>
            <Trans>
              Suspension Duration
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
            Confirm Suspend Club
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
