import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffClubTransferOwnershipFormMutation } from '@//:artifacts/StaffClubTransferOwnershipFormMutation.graphql'
import {
  StaffClubTransferOwnershipFormFragment$key
} from '@//:artifacts/StaffClubTransferOwnershipFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import GenericTagId from '@//:common/validation/GenericTagId'

interface Props {
  query: StaffClubTransferOwnershipFormFragment$key
}

interface FormValues {
  accountId: string
}

const Fragment = graphql`
  fragment StaffClubTransferOwnershipFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffClubTransferOwnershipFormMutation($input: TransferClubOwnershipInput!) {
    transferClubOwnership(input: $input) {
      club {
        id
        owner {
          id
        }
      }
    }
  }
`

export default function StaffClubTransferOwnershipForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffClubTransferOwnershipFormMutation>(Mutation)

  const schema = Joi.object({
    accountId: GenericTagId()
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
          title: t`Successfully transferred ownership`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error transferring ownership`
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
          id='accountId'
          size='md'
        >
          <InputHeader>
            <Trans>
              Account ID
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder='accountId' />
            <InputFeedback />
          </InputBody>
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='orange'
        >
          <Trans>
            Transfer Ownership
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
