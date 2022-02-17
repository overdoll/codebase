import { InputLeftAddon, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateClubFormMutation } from '@//:artifacts/CreateClubFormMutation.graphql'
import { useHistory } from '@//:modules/routing'
import generatePath from '@//:modules/routing/generatePath'
import ClubName from '@//:modules/validation/ClubName'
import ClubSlug from '@//:modules/validation/ClubSlug'
import translateValidation from '@//:modules/validation/translateValidation'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import useSlugSubscribe from '../../../../../Admin/helpers/useSlugSubscribe'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  InputHelperText,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

interface Props extends ConnectionProp {
  isDisabled: boolean
}

interface ClubValues {
  name: string
  slug: string
}

const Mutation = graphql`
  mutation CreateClubFormMutation($input: CreateClubInput!, $connections: [ID!]!) {
    createClub(input: $input) {
      club @appendNode(connections: $connections, edgeTypeName: "createClubPrimaryEdge") {
        id
        slug
        name
        owner {
          id
        }
      }
      validation
    }
  }
`

export default function CreateClubForm ({
  isDisabled,
  connectionId
}: Props): JSX.Element {
  const [createClub, isCreatingClub] = useMutation<CreateClubFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const history = useHistory()

  const schema = Joi.object({
    name: ClubName(),
    slug: ClubSlug()
  })

  const methods = useForm<ClubValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    setError
  } = methods

  const onSubmit = (formValues): void => {
    createClub({
      variables: {
        input: {
          ...formValues
        },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createClub?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.createClub.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Club ${formValues.name} was created successfully`
        })
        const redirectPath = generatePath('/club/:slug/:entity', {
          slug: data.createClub?.club?.slug,
          entity: 'home'
        })
        history.push(redirectPath)
      },
      updater: (store, payload) => {
        const node = store.get(payload?.createClub?.club?.owner?.id as string)
        if (node != null) {
          node.setValue(node.getValue('clubsCount') as number + 1, 'clubsCount')
        }
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating club ${data.message}`
        })
      }
    })
  }

  useSlugSubscribe({
    from: 'name',
    ...methods
  })

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={6}>
        <FormInput size='lg' id='name'>
          <InputHeader>
            <Trans>
              Your Club Name
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`The best name you can come up with`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter>
            <InputHelperText>
              <Trans>
                This is the name everyone will see
              </Trans>
            </InputHelperText>
          </InputFooter>
        </FormInput>
        <FormInput size='md' id='slug'>
          <InputHeader>
            <Trans>
              Your Unique Club Link
            </Trans>
          </InputHeader>
          <InputBody>
            <InputLeftAddon>
              <Trans>
                overdoll.com/
              </Trans>
            </InputLeftAddon>
            <TextInput placeholder={i18n._(t`A unique link`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter>
            <InputHelperText>
              <Trans>
                This is the unique link everyone will use to see your club
              </Trans>
            </InputHelperText>
          </InputFooter>
        </FormInput>
        <FormSubmitButton
          w='100%'
          size='lg'
          isLoading={isCreatingClub}
          colorScheme='teal'
        >
          <Trans>
            Create Club
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
