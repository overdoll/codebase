import { useState } from 'react'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Select, Stack, Textarea } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'

interface NoteValues {
  note: string
  rejectionId: string
}

interface Props {
  infractions: RejectionReasonsFragment$key
  isModeratingPost: boolean
  onSubmit: (data: NoteValues) => void
}

const InfractionsGQL = graphql`
  fragment RejectionReasonsFragment on Query {
    rules {
      edges {
        node {
          id
          title
          infraction
        }
      }
    }
  }
`

export default function RejectionReasons (props: Props): JSX.Element {
  const data = useFragment(InfractionsGQL, props.infractions)

  const { i18n } = useLingui()

  const [infraction, setInfraction] = useState<boolean>(false)

  const findInfraction = (id): void => {
    setInfraction(data.rules.edges.filter((item) => item.node.id === id)[0]?.node.infraction)
  }

  const schema = Joi.object({
    rejectionId: Joi
      .string()
      .required()
      .messages({
        'any.required': i18n._(t`Please select a rejection reason`)
      }),
    note: Joi
      .string()
      .min(5)
      .max(255)
      .required()
      .messages({
        'string.empty': i18n._(t`Please add a note`),
        'string.min': i18n._(t`The note needs at least 5 characters`),
        'string.max': i18n._(t`The note cannot exceed 255 characters`)
      })
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NoteValues>({
    resolver: joiResolver(
      schema
    )
  })

  return (
    <form noValidate onSubmit={handleSubmit(props.onSubmit)}>
      <Stack spacing={3}>
        <FormControl isInvalid={errors.rejectionId != null}>
          <FormLabel>
            <Trans>
              Reason
            </Trans>
          </FormLabel>
          <Controller
            control={control}
            name='rejectionId'
            render={({
              field: {
                onChange
              },
              fieldState: {
                invalid
              }
            }) => (
              <Select
                onChange={(e) => {
                  findInfraction(e.target.value)
                  onChange(e.target.value)
                }}
                placeholder={i18n._(t`Select the rejection reason`)}
                isInvalid={invalid}
              >
                {data.rules.edges.map((item, index) =>
                  <option key={index} value={item.node.id}>{item.node.title}</option>
                )}
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors?.rejectionId?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.note != null}>
          <FormLabel>
            <Trans>
              Note
            </Trans>
          </FormLabel>
          <Textarea
            resize='none'
            {...register('note')}
            placeholder={i18n._(t`Add a note describing the reason in detail...`)}
          />
          <FormErrorMessage>
            {errors?.note?.message}
          </FormErrorMessage>
        </FormControl>
        {infraction &&
          <Alert mt={1} mb={1} status='warning'>
            <AlertIcon mt={1} mb={3} />
            <AlertDescription>
              <Trans>
                This rejection reason is an infraction. The poster's account will be temporarily suspended.
              </Trans>
            </AlertDescription>
          </Alert>}
        <Flex justify='flex-end'>
          <Button
            isDisabled={(errors.rejectionId != null) || (errors.note != null)}
            isLoading={props.isModeratingPost}
            size='md'
            colorScheme='orange'
            type='submit'
          >
            <Trans>
              Reject Post
            </Trans>
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
