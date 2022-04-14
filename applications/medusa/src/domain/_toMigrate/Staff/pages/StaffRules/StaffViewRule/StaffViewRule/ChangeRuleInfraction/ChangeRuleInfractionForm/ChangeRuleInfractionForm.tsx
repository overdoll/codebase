import { HStack, Stack, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagInfraction } from '@//:types/form'
import { ChangeRuleInfractionFormMutation } from '@//:artifacts/ChangeRuleInfractionFormMutation.graphql'
import { ChangeRuleInfractionFormFragment$key } from '@//:artifacts/ChangeRuleInfractionFormFragment.graphql'
import GenericBoolean from '../../../../../../../../../common/validation/GenericBoolean'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  SwitchInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeRuleInfractionFormFragment$key
}

type RuleValues = TagInfraction

const Fragment = graphql`
  fragment ChangeRuleInfractionFormFragment on Rule {
    id
    infraction
  }
`

const Mutation = graphql`
  mutation ChangeRuleInfractionFormMutation($input: UpdateRuleInfractionInput!) {
    updateRuleInfraction(input: $input) {
      rule {
        id
        infraction
      }
    }
  }
`

export default function ChangeRuleInfractionForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeRuleInfractionFormMutation>(Mutation)

  const schema = Joi.object({
    infraction: GenericBoolean()
  })

  const notify = useToast()

  const methods = useForm<RuleValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      infraction: data.infraction
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
          title: t`Successfully updated rule infraction`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating rule infraction`
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
          id='infraction'
          size='md'
        >
          <InputHeader>
            <Trans>
              Rule Infraction
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
