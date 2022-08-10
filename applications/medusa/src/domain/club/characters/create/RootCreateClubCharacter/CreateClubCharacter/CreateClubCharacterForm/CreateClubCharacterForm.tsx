import { InputLeftAddon, Stack } from '@chakra-ui/react'
import { Plural, t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import { CreateClubCharacterFormMutation } from '@//:artifacts/CreateClubCharacterFormMutation.graphql'
import { CreateClubCharacterFormFragment$key } from '@//:artifacts/CreateClubCharacterFormFragment.graphql'
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
import translateValidation from '@//:modules/validation/translateValidation'
import useSlugSubscribe from '../../../../../../../common/support/useSlugSubscribe'
import { useRouter } from 'next/router'

interface Props {
  query: CreateClubCharacterFormFragment$key
}

interface FormValues {
  title: string
  slug: string
}

const Fragment = graphql`
  fragment CreateClubCharacterFormFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 8}
    after: {type: String}
  ) {
    slug
    id
    charactersLimit
    charactersCount
    characters(first: $first, after: $after)
    @connection(key: "ClubCharacters_characters") {
      __id
      edges {
        node {
          ...CharacterTileOverlayFragment
          ...CharacterLinkTileFragment
        }
      }
    }
  }
`

const Mutation = graphql`
  mutation CreateClubCharacterFormMutation ($input: CreateCharacterInput!, $connections: [ID!]!) {
    createCharacter(input: $input)  {
      validation
      character @appendNode(connections: $connections, edgeTypeName: "createCharacterPrimaryEdge") {
        id
        name
        club {
          name
          slug
          charactersCount
        }
        slug
        ...CharacterTileOverlayFragment
        ...CharacterLinkTileFragment
      }
    }
  }
`

export default function CreateClubCharacterForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<CreateClubCharacterFormMutation>(Mutation)

  const router = useRouter()

  const { i18n } = useLingui()

  const connectionId = data.characters.__id

  const isDisabled = data.charactersLimit === data.charactersCount

  const remainingCharacters = data.charactersLimit - data.charactersCount

  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(25)
      .messages({
        'string.empty': i18n._(t`Please enter a name for your character`),
        'string.min': i18n._(t`The name must be at least 2 characters`),
        'string.max': i18n._(t`The name cannot exceed 25 characters`)
      }),
    slug: Joi
      .string()
      .required()
      .min(2)
      .max(25)
      .regex(/^[a-zA-Z0-9]*$/)
      .messages({
        'string.empty': i18n._(t`Please enter a character link`),
        'string.min': i18n._(t`The character link must be at least 2 characters`),
        'string.max': i18n._(t`The character link cannot exceed 25 characters`),
        'string.pattern.base': i18n._(t`The character link can only contain numbers and letters.`)
      })
  })

  const notify = useToast()

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

  useSlugSubscribe({
    from: 'name',
    ...methods
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          clubId: data.id,
          ...formValues
        },
        connections: [connectionId]
      },
      onCompleted (queryData) {
        if (queryData?.createCharacter?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(queryData.createCharacter.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Successfully created character ${formValues.name}`
        })
        void router.push({
          pathname: '/club/[slug]/characters',
          query: {
            slug: data.slug
          }
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating character`
        })
      }
    })
  }

  return (
    <Stack spacing={2}>
      <Form
        onSubmit={onSubmit}
        {...methods}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <FormInput size='lg' id='name'>
              <InputHeader>
                <Trans>
                  Your Character Name
                </Trans>
              </InputHeader>
              <InputBody>
                <TextInput placeholder={i18n._(t`Character name`)} />
                <InputFeedback />
              </InputBody>
              <InputFooter />
            </FormInput>
            <FormInput size='md' id='slug'>
              <InputHeader>
                <Trans>
                  Your Unique Character Link
                </Trans>
              </InputHeader>
              <InputBody>
                <InputLeftAddon>
                  /{data.slug}/character/
                </InputLeftAddon>
                <TextInput placeholder={i18n._(t`A unique link`)} />
                <InputFeedback />
              </InputBody>
              <InputFooter />
            </FormInput>
          </Stack>
          <FormSubmitButton
            isLoading={isInFlight}
            isDisabled={isDisabled}
            w='100%'
            size='lg'
            colorScheme='teal'
          >
            <Trans>
              Create Character
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
      {isDisabled
        ? (
          <Alert
            status='warning'
          >
            <AlertIcon />
            <AlertDescription>
              <Trans>
                You have created the maximum number of allowed characters ({data.charactersLimit}). Please contact us if
                you would like this limit increased.
              </Trans>
            </AlertDescription>
          </Alert>
          )
        : (
          <Alert
            status='info'
          >
            <AlertIcon />
            <AlertDescription>
              <Plural
                value={remainingCharacters}
                one='You can create # more character'
                other='You can create # more characters'
              />
            </AlertDescription>
          </Alert>
          )}
    </Stack>
  )
}
