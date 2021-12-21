import { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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
    postRejectionReasons {
      edges {
        node {
          id
          reason
          infraction
        }
      }
    }
  }
`

const schema = Joi.object({
  rejectionId: Joi.string().required(),
  note: Joi
    .string()
    .min(1)
    .max(255)
    .required()
})

export default function RejectionReasons (props: Props): JSX.Element {
  const data = useFragment(InfractionsGQL, props.infractions)

  const { i18n } = useLingui()

  const [infraction, setInfraction] = useState<boolean>(false)

  const findInfraction = (id): void => {
    setInfraction(data.postRejectionReasons.edges.filter((item) => item.node.id === id)[0]?.node.infraction)
  }

  const {
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
          <Select
            {...register('rejectionId')}
            onChange={(e) => findInfraction(e.target.value)}
            placeholder={i18n._(t`Select the rejection reason`)}
          >
            {data.postRejectionReasons.edges.map((item, index) =>
              <option key={index} value={item.node.id}>{item.node.reason}</option>
            )}
          </Select>
          <FormErrorMessage>
            {(errors.rejectionId != null) && errors.rejectionId.type === 'string.empty' &&
              <Trans>Please select a rejection option</Trans>}
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
            {(errors.note != null) && (errors.note.type === 'string.empty' || errors.note.type === 'string.min') &&
              <Trans>The note cannot be empty</Trans>}
            {(errors.note != null) && errors.note.type === 'string.max' &&
              <Trans>The note cannot exceed 255 characters</Trans>}
          </FormErrorMessage>
        </FormControl>
        {infraction != null &&
          <Alert borderRadius={5} mt={1} mb={1} status='warning'>
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
