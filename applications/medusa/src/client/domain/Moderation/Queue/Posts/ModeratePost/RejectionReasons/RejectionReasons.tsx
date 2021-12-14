import { useTranslation } from 'react-i18next'
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
  const [t] = useTranslation('moderation')

  const data = useFragment(InfractionsGQL, props.infractions)

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
            {t('queue.post.actions.reject.modal.form.dropdown.label')}
          </FormLabel>
          <Select
            {...register('rejectionId')}
            onChange={(e) => findInfraction(e.target.value)}
            placeholder={t('queue.post.actions.reject.modal.form.dropdown.placeholder')}
          >
            {data.postRejectionReasons.edges.map((item, index) =>
              <option key={index} value={item.node.id}>{item.node.reason}</option>
            )}
          </Select>
          <FormErrorMessage>
            {(errors.rejectionId != null) && errors.rejectionId.type === 'string.empty' && t('queue.post.actions.reject.modal.form.validation.rejectionId.empty')}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.note != null}>
          <FormLabel>
            {t('queue.post.actions.reject.modal.form.textarea.label')}
          </FormLabel>
          <Textarea
            resize='none'
            {...register('note')}
            placeholder={t('queue.post.actions.reject.modal.form.textarea.placeholder')}
          />
          <FormErrorMessage>
            {(errors.note != null) && (errors.note.type === 'string.empty' || errors.note.type === 'string.min') && t('queue.post.actions.reject.modal.form.validation.note.empty')}
            {(errors.note != null) && errors.note.type === 'string.max' && t('queue.post.actions.reject.modal.form.validation.note.max')}
          </FormErrorMessage>
        </FormControl>
        {infraction != null &&
          <Alert borderRadius={5} mt={1} mb={1} status='warning'>
            <AlertIcon mt={1} mb={3} />
            <AlertDescription>{t('queue.post.actions.reject.modal.infraction')}
            </AlertDescription>
          </Alert>}
        <Flex justify='flex-end'>
          <Button
            isDisabled={(errors.rejectionId != null) || (errors.note != null)}
            isLoading={props.isModeratingPost}
            size='md'
            colorScheme='orange'
            type='submit'
          >{t('queue.post.actions.reject.modal.form.submit')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
