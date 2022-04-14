import { HStack, Stack, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagStandard } from '@//:types/form'
import { ChangeAudienceStandardFormMutation } from '@//:artifacts/ChangeAudienceStandardFormMutation.graphql'
import { ChangeAudienceStandardFormFragment$key } from '@//:artifacts/ChangeAudienceStandardFormFragment.graphql'
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
  query: ChangeAudienceStandardFormFragment$key
}

type AudienceValues = TagStandard

const Fragment = graphql`
  fragment ChangeAudienceStandardFormFragment on Audience {
    id
    standard

  }
`

const Mutation = graphql`
  mutation ChangeAudienceStandardFormMutation($input: UpdateAudienceIsStandardInput!) {
    updateAudienceIsStandard(input: $input) {
      audience {
        id
        standard
      }
    }
  }
`

export default function ChangeAudienceStandardForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeAudienceStandardFormMutation>(Mutation)

  const schema = Joi.object({
    standard: GenericBoolean()
  })

  const notify = useToast()

  const methods = useForm<AudienceValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      standard: data.standard
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
          title: t`Successfully updated audience standard`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating audience standard`
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
          id='standard'
          size='md'
        >
          <InputHeader>
            <Trans>
              Audience Standard
            </Trans>
          </InputHeader>
          <HStack spacing={2}>
            <SwitchInput />
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Standard
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
