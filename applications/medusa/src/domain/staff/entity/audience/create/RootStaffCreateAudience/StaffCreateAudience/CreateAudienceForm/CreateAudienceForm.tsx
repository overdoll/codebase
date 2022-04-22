import { HStack, Stack, Text } from '@chakra-ui/react'
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
import GenericTagTitle from '../../../../../../../../common/validation/GenericTagTitle'
import GenericTagSlug from '../../../../../../../../common/validation/GenericTagSlug'
import { TagSlug, TagStandard, TagTitle } from '@//:types/form'
import GenericBoolean from '../../../../../../../../common/validation/GenericBoolean'
import useSlugSubscribe from '../../../../../../../../common/support/useSlugSubscribe'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  SwitchInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

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
    ),
    defaultValues: {
      standard: false
    }
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
              Audience Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter an audience title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='slug'
        >
          <InputHeader>
            <Trans>
              Audience Slug
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter an audience slug`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='standard'
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
          size='lg'
        >
          <Trans>
            Create Audience
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
