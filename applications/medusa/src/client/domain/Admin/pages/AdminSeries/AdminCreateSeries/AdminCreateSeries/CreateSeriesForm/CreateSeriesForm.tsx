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
import { TagSlug, TagTitle } from '@//:types/form'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import useSequence from '@//:modules/content/HookedComponents/Sequence/hooks/useSequence'
import ValueResolver from '@//:modules/content/HookedComponents/Sequence/resolver/ValueResolver'

type Props = ConnectionProp

type SeriesValues = TagTitle & TagSlug

interface SequenceProps {
  test: string
}

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
    setError
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
    from: 'title',
    ...methods
  })

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <FormInput
          id='title'
        >
          <InputHeader>
            <Trans>
              Series Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a series title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='slug'
        >
          <InputHeader>
            <Trans>
              Series Slug
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a series slug`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Series
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
