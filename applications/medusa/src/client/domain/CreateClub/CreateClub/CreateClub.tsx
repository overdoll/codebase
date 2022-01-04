import { FormControl, FormLabel, InputLeftAddon, Stack, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateClubMutation } from '@//:artifacts/CreateClubMutation.graphql'
import { useHistory } from '@//:modules/routing'
import { useEffect } from 'react'
import urlSlug from 'url-slug'

interface ClubValues {
  name: string
  slug: string
}

const Mutation = graphql`
  mutation CreateClubMutation($name: String!, $slug: String!) {
    createClub(input: {name: $name, slug: $slug}) {
      club {
        id
        reference
        slug
        name
        owner {
          id
        }
        thumbnail {
          type
          urls {
            url
            mimeType
          }
        }
      }
    }
  }
`

export default function CreateClub (): JSX.Element {
  const { i18n } = useLingui()

  const [createClub, isCreatingClub] = useMutation<CreateClubMutation>(
    Mutation
  )

  const notify = useToast()

  const history = useHistory()

  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .min(3)
      .max(15)
      .messages({
        'string.empty': i18n._(t`Please enter a name for your club`),
        'string.min': i18n._(t`The name must be at least 3 characters`),
        'string.max': i18n._(t`The name cannot exceed 15 characters`)
      }),
    slug: Joi
      .string()
      .regex(/^[a-z0-9-]+$/)
      .min(3)
      .max(20)
      .required()
      .messages({
        'string.empty': i18n._(t`Please enter a club link`),
        'string.min': i18n._(t`The club link must be at least 3 characters`),
        'string.max': i18n._(t`The club link cannot exceed 15 characters`),
        'string.pattern.base': i18n._(t`The club link can only contain numbers, letters, and dashes.`)
      })
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
        name: formValues.name
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Club ${formValues.name} was created successfully`,
          isClosable: true
        })
        // history.push('/manage/clubs')
      },
      updater: (store, payload) => {
        // TODO somehow update store to have the new club?
        const storyRecord = store.getRoot()?.getLinkedRecord('viewer')?.getLinkedRecord('clubs')
        /*

        return
        if (storyRecord == null) return

        const connectionRecord = ConnectionHandler.getConnection(
          storyRecord,
          'ManageClubs_clubs'
        )

        // Create a new local Comment record
        const id = `client:new_club:${123123}`
        const newClubRecord = store.create(id, 'Club')

        const newEdge = ConnectionHandler.createEdge(
          store,
          connectionRecord as RecordProxy,
          newClubRecord,
          'ClubEdge'
        )

        ConnectionHandler.insertEdgeAfter(
          connectionRecord as RecordProxy,
          newEdge
        )

        // const clubsRecord = store.get('ManageClubs_clubs')

        console.log(payload.createClub.club)
        // Get the edge inside the payload
        const serverEdge = payload.getLinkedRecord('club');

        // Build edge for adding to the connection
        const newEdge = ConnectionHandler.buildConnectionEdge(
          store,
          connectionRecord,
          serverEdge,
        );

         */
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
      <Stack spacing={4}>
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
          isDisabled={errors.name != null || errors.slug != null}
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
