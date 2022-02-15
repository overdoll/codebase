import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateCharacterFormMutation } from '@//:artifacts/CreateCharacterFormMutation.graphql'
import translateValidation from '@//:modules/validation/translateValidation'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import useSlugSubscribe from '../../../../../helpers/useSlugSubscribe'
import GenericTagSlug from '../../../../../validation/GenericTagSlug'
import {
  InputBuilder,
  InputBuilderBody,
  InputBuilderFooter,
  InputBuilderHeader,
  InputFeedback,
  TextInput
} from '@//:modules/form/FormBuilder/InputBuilder'
import { TagName, TagSeriesId, TagSlug } from '@//:types/form'
import GenericTagId from '../../../../../validation/GenericTagId'
import GenericTagName from '../../../../../validation/GenericTagName'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'

type Props = ConnectionProp

export type CharacterValues = TagName & TagSlug & TagSeriesId

const Mutation = graphql`
  mutation CreateCharacterFormMutation($input: CreateCharacterInput!, $connections: [ID!]!) {
    createCharacter(input: $input) {
      character @appendNode(connections: $connections, edgeTypeName: "createCharacterEdge") {
        id
        name
        slug
      }
      validation
    }
  }
`

export default function CreateCharacterForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateCharacterFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    name: GenericTagName(),
    slug: GenericTagSlug(),
    seriesId: GenericTagId()
  })

  const methods = useForm<CharacterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError, watch, setValue } = methods

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createCharacter?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.createCharacter.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Character ${formValues.name} was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating character ${data.message}`
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
          id='name'
        >
          <InputBuilderHeader>
            <Trans>
              Character Name
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a name for the character`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <InputBuilder
          id='slug'
        >
          <InputBuilderHeader>
            <Trans>
              Character Slug
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a character slug`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <InputBuilder
          id='series'
        >
          <InputBuilderHeader>
            <Trans>
              Character Series
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a series`)} />
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
            Create Character
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
