import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagDeprecated } from '@//:types/form'
import { ChangeRuleDeprecatedFormMutation } from '@//:artifacts/ChangeRuleDeprecatedFormMutation.graphql'
import { ChangeRuleDeprecatedFormFragment$key } from '@//:artifacts/ChangeRuleDeprecatedFormFragment.graphql'
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
  query: ChangeRuleDeprecatedFormFragment$key
}

type RuleValues = TagDeprecated

const Fragment = graphql`
  fragment ChangeRuleDeprecatedFormFragment on Rule {
    id
    deprecated
  }
`

const Mutation = graphql`
  mutation ChangeRuleDeprecatedFormMutation($input: UpdateRuleDeprecatedInput!) {
    updateRuleDeprecated(input: $input) {
      rule {
        id
        deprecated
      }
    }
  }
`

export default function ChangeRuleDeprecatedForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeRuleDeprecatedFormMutation>(Mutation)

  const { i18n } = useLingui()

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
          id: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated rule deprecated`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating rule deprecated`
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
              Rule Deprecated
            </Trans>
          </InputHeader>
          <SwitchInput placeholder={i18n._(t`Deprecated`)} />
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
