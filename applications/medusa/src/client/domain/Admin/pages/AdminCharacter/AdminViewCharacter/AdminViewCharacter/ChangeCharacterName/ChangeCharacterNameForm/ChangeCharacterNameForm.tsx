import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  InputBuilder,
  InputBuilderBody,
  InputBuilderFooter,
  InputBuilderHeader,
  InputFeedback,
  TextInput
} from '@//:modules/form/InputBuilder'
import { TagLocale, TagName } from '@//:types/form'
import { ChangeSeriesTitleFormMutation } from '@//:artifacts/ChangeSeriesTitleFormMutation.graphql'
import { ChangeCharacterNameFormFragment$key } from '@//:artifacts/ChangeCharacterNameFormFragment.graphql'
import Locale from '@//:modules/validation/Locale'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'
import GenericTagName from '../../../../../../validation/GenericTagName'

interface Props {
  query: ChangeCharacterNameFormFragment$key
}

type CharacterValues = TagName & TagLocale

const Fragment = graphql`
  fragment ChangeCharacterNameFormFragment on Character {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeCharacterNameFormMutation ($input: UpdateCharacterNameInput!) {
    updateCharacterName(input: $input) {
      character {
        id
        name
        nameTranslations {
          text
          language {
            locale
            name
          }
        }
      }
    }
  }
`

export default function ChangeCharacterNameForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeSeriesTitleFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    name: GenericTagName(),
    locale: Locale()
  })

  const notify = useToast()

  const methods = useForm<CharacterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          ...formValues
        }
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Updated character name to ${formValues.name} for ${formValues.locale}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating character name`
        })
      }
    })
  }

  return (
    <FormBuilder
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <InputBuilder
            id='name'
            size='sm'
          >
            <InputBuilderHeader>
              <Trans>
                Character Name
              </Trans>
            </InputBuilderHeader>
            <InputBuilderBody>
              <TextInput placeholder={i18n._(t`Enter a name`)} />
              <InputFeedback />
            </InputBuilderBody>
            <InputBuilderFooter />
          </InputBuilder>
          <InputBuilder
            id='locale'
            size='sm'
          >
            <InputBuilderHeader>
              <Trans>
                BCP 47 Locale Code
              </Trans>
            </InputBuilderHeader>
            <InputBuilderBody>
              <TextInput placeholder={i18n._(t`Locale`)} />
              <InputFeedback />
            </InputBuilderBody>
            <InputBuilderFooter />
          </InputBuilder>
        </Stack>
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
