import { FormControl, FormLabel, InputLeftAddon, Stack, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import StyledInput from '@//:modules/content/ThemeComponents/StyledInput/StyledInput'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateClubFormMutation } from '@//:artifacts/CreateClubFormMutation.graphql'
import { useHistory } from '@//:modules/routing'
import { useEffect } from 'react'
import urlSlug from 'url-slug'
import generatePath from '@//:modules/routing/generatePath'
import ClubName from '@//:modules/validation/ClubName'
import ClubSlug from '@//:modules/validation/ClubSlug'
import translateValidation from '@//:modules/validation/translateValidation'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  isDisabled: boolean
}

interface ClubValues {
  name: string
  slug: string
}

const Mutation = graphql`
  mutation CreateClubFormMutation($name: String!, $slug: String!, $connections: [ID!]!) {
    createClub(input: {name: $name, slug: $slug}) {
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<ClubValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    createClub({
      variables: {
        slug: formValues.slug,
        name: formValues.name,
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
          title: t`Club ${formValues.name} was created successfully`,
          isClosable: true
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
          title: t`Error creating club ${data.message}`,
          isClosable: true
        })
      }
    })
  }

  const successName = isDirty && (errors.name == null) && isSubmitted

  const successSlug = isDirty && (errors.slug == null) && isSubmitted

  // We watch the name of the club and set that as the slug
  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === 'name') {
        setValue('slug', urlSlug(value.name))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl isInvalid={errors.name != null}>
          <FormLabel>
            <Trans>
              Your Club Name
            </Trans>
          </FormLabel>
          <StyledInput
            size='lg'
            register={register('name')}
            success={successName}
            error={errors.name != null}
            errorMessage={errors?.name?.message}
            placeholder={i18n._(t`The best name you can come up with`)}
            helperText={i18n._(t`This is the name everyone will see`)}
          />
        </FormControl>
        <FormControl isInvalid={errors.slug != null}>
          <FormLabel>
            <Trans>
              Your Unique Club Link
            </Trans>
          </FormLabel>
          <StyledInput
            inputLeftAddon={
              <InputLeftAddon>
                <Trans>
                  overdoll.com/
                </Trans>
              </InputLeftAddon>
            }
            size='md'
            register={register('slug')}
            success={successSlug}
            error={errors.slug != null}
            errorMessage={errors?.slug?.message}
            placeholder={i18n._(t`A unique link`)}
            helperText={i18n._(t`This is the unique link everyone will use to see your club`)}
          />
        </FormControl>
        <Button
          isDisabled={errors.name != null || errors.slug != null || isDisabled}
          isLoading={isCreatingClub}
          type='submit'
          w='100%'
          size='lg'
          colorScheme={errors.name != null || errors.slug != null ? 'gray' : 'teal'}
        >
          <Trans>
            Create Club
          </Trans>
        </Button>
      </Stack>
    </form>
  )
}
