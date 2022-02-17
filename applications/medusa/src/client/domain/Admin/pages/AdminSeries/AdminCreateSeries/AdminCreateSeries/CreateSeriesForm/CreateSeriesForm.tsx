import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateSeriesFormMutation } from '@//:artifacts/CreateSeriesFormMutation.graphql'
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
  TextInput
} from '@//:modules/form/InputBuilder'
import { TagSlug, TagTitle } from '@//:types/form'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'

type Props = ConnectionProp

type SeriesValues = TagTitle & TagSlug

const Mutation = graphql`
  mutation CreateSeriesFormMutation($input: CreateSeriesInput!, $connections: [ID!]!) {
    createSeries(input: $input) {
      series @appendNode(connections: $connections, edgeTypeName: "createSeriesEdge") {
        id
        title
        slug
      }
      validation
    }
  }
`

export default function CreateSeriesForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateSeriesFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    slug: GenericTagSlug()
  })

  const methods = useForm<SeriesValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    setError,
    watch,
    setValue
  } = methods

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createSeries?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.createSeries.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Series ${formValues.title} was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating series ${data.message}`
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
              Series Title
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a series title`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <InputBuilder
          id='slug'
        >
          <InputBuilderHeader>
            <Trans>
              Series Slug
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a series slug`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <FormBuilderSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Series
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
