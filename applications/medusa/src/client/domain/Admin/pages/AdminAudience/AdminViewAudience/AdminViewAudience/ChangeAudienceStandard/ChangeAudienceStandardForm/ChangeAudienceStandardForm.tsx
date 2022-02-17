import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { InputBuilder, InputBuilderFooter, InputBuilderHeader, SwitchInput } from '@//:modules/form/InputBuilder'
import { TagStandard } from '@//:types/form'
import { ChangeAudienceStandardFormMutation } from '@//:artifacts/ChangeAudienceStandardFormMutation.graphql'
import { ChangeAudienceStandardFormFragment$key } from '@//:artifacts/ChangeAudienceStandardFormFragment.graphql'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'
import GenericBoolean from '../../../../../../validation/GenericBoolean'

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

  const { i18n } = useLingui()

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
    <FormBuilder
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <InputBuilder
          id='standard'
          size='md'
        >
          <InputBuilderHeader>
            <Trans>
              Audience Standard
            </Trans>
          </InputBuilderHeader>
          <SwitchInput placeholder={i18n._(t`Standard`)} />
          <InputBuilderFooter />
        </InputBuilder>
        <FormBuilderSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='sm'
        >
          <Trans>
            Submit
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
