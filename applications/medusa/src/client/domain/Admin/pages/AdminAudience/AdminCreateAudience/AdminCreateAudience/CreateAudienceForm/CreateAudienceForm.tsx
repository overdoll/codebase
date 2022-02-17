import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateAudienceFormMutation } from '@//:artifacts/CreateAudienceFormMutation.graphql'
import translateValidation from '@//:modules/validation/translateValidation'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import useSlugSubscribe from '../../../../../helpers/useSlugSubscribe'
import GenericTagTitle from '../../../../../validation/GenericTagTitle'
import GenericTagSlug from '../../../../../validation/GenericTagSlug'
import {
  InputBuilder,
  InputBuilderBody,
  InputBuilderFooter,
  InputBuilderHeader,
  InputFeedback,
  SwitchInput,
  TextInput
} from '@//:modules/form/InputBuilder'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'
import { TagSlug, TagStandard, TagTitle } from '@//:types/form'
import GenericBoolean from '../../../../../validation/GenericBoolean'

type Props = ConnectionProp

type AudienceValues = TagTitle & TagSlug & TagStandard

const Mutation = graphql`
  mutation CreateAudienceFormMutation($input: CreateAudienceInput!, $connections: [ID!]!) {
    createAudience(input: $input) {
      audience @appendNode(connections: $connections, edgeTypeName: "createAudienceEdge") {
        id
        title
        slug
      }
      validation
    }
  }
`

export default function CreateAudienceForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateAudienceFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    slug: GenericTagSlug(),
    standard: GenericBoolean()
  })

  const methods = useForm<AudienceValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    setError,
    setValue,
    watch
  } = methods

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createAudience?.validation != null) {
          setError('slug' as never, {
            type: 'mutation',
            message: i18n._(translateValidation(data.createAudience.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Audience ${formValues.title} was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating audience ${data.message}`
        })
      }
    })
  }

  useSlugSubscribe({
    watch: watch,
    setValue: setValue,
    from: 'title'
  })

  return (
    <FormBuilder
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <InputBuilder
          id='title'
        >
          <InputBuilderHeader>
            <Trans>
              Audience Title
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter an audience title`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <InputBuilder
          id='slug'
        >
          <InputBuilderHeader>
            <Trans>
              Audience Slug
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter an audience slug`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <InputBuilder
          id='standard'
        >
          <InputBuilderHeader>
            <Trans>
              Audience Standard
            </Trans>
          </InputBuilderHeader>
          <SwitchInput placeholder={i18n._(t`Is standard?`)} />
          <InputBuilderFooter />
        </InputBuilder>
        <FormBuilderSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Audience
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
