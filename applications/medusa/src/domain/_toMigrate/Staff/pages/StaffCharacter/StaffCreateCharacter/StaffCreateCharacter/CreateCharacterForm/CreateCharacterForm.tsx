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
import useSlugSubscribe from '../../../../../support/useSlugSubscribe'
import GenericTagSlug from '../../../../../../../../common/validation/GenericTagSlug'
import { TagName, TagSeriesId, TagSlug } from '@//:types/form'
import GenericTagId from '../../../../../../../../common/validation/GenericTagId'
import GenericTagName from '../../../../../../../../common/validation/GenericTagName'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  SeriesInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

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
          id='name'
        >
          <InputHeader>
            <Trans>
              Character Name
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a name for the character`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='slug'
        >
          <InputHeader>
            <Trans>
              Character Slug
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a character slug`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='seriesId'
        >
          <InputHeader>
            <Trans>
              Character Series
            </Trans>
          </InputHeader>
          <SeriesInput />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Character
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
