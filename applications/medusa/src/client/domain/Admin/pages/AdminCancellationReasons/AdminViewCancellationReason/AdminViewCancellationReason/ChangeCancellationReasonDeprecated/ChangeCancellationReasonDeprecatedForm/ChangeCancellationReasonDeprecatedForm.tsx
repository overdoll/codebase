import { HStack, Stack, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagDeprecated } from '@//:types/form'
import {
  ChangeCancellationReasonDeprecatedFormMutation
} from '@//:artifacts/ChangeCancellationReasonDeprecatedFormMutation.graphql'
import {
  ChangeCancellationReasonDeprecatedFormFragment$key
} from '@//:artifacts/ChangeCancellationReasonDeprecatedFormFragment.graphql'
import GenericBoolean from '../../../../../../validation/GenericBoolean'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  SwitchInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeCancellationReasonDeprecatedFormFragment$key
}

type RuleValues = TagDeprecated

const Fragment = graphql`
  fragment ChangeCancellationReasonDeprecatedFormFragment on CancellationReason {
    id
    deprecated
  }
`

const Mutation = graphql`
  mutation ChangeCancellationReasonDeprecatedFormMutation($input: UpdateCancellationReasonDeprecatedInput!) {
    updateCancellationReasonDeprecated(input: $input) {
      cancellationReason {
        id
        deprecated
      }
    }
  }
`

export default function ChangeCancellationReasonDeprecatedForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeCancellationReasonDeprecatedFormMutation>(Mutation)

  const schema = Joi.object({
    deprecated: GenericBoolean()
  })

  const notify = useToast()

  const methods = useForm<RuleValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      deprecated: data.deprecated
    }
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          cancellationReasonId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated cancellation reason deprecated`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating cancellation reason deprecated`
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
          id='deprecated'
          size='md'
        >
          <InputHeader>
            <Trans>
              Cancellation Reason Deprecated
            </Trans>
          </InputHeader>
          <HStack spacing={2}>
            <SwitchInput />
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Deprecated
              </Trans>
            </Text>
          </HStack>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='sm'
        >
          <Trans>
            Submit
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
