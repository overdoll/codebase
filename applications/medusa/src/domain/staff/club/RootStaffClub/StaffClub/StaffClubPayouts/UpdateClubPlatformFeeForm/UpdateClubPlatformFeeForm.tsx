import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffLockAccountFormMutation } from '@//:artifacts/StaffLockAccountFormMutation.graphql'
import { UpdateClubPlatformFeeFormFragment$key } from '@//:artifacts/UpdateClubPlatformFeeFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  SelectInput
} from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'

interface Props {
  query: UpdateClubPlatformFeeFormFragment$key
}

interface FormValues {
  percent: number
}

const Fragment = graphql`
  fragment UpdateClubPlatformFeeFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation UpdateClubPlatformFeeFormMutation($input: UpdateClubPlatformFeeInput!) {
    updateClubPlatformFee(input: $input) {
      clubPlatformFee {
        id
        percent
      }
    }
  }
`

export default function UpdateClubPlatformFeeForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffLockAccountFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    percent: Joi.number().integer().min(20).max(30).required()
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
          title: t`Successfully updated platform fee`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the platform fee`
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
          id='percent'
          size='md'
        >
          <InputHeader>
            <Trans>
              Platform Fee %
            </Trans>
          </InputHeader>
          <SelectInput placeholder={i18n._(t`Select percentage`)}>
            {[...Array(11).keys()].map((item) => (
              <option key={item} value={item + 20}>
                {item + 20}%
              </option>))}
          </SelectInput>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='green'
        >
          <Trans>
            Update Club Platform Fee
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
