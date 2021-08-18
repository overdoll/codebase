/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Alert, AlertDescription,
  AlertIcon, Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack, Textarea
} from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'

type NoteValues = {
  note: string,
  rejectionId: string,
};

type Props = {
  infractions: RejectionReasonsFragment$key,
  isModeratingPost: boolean,
  onSubmit: () => void
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

export default function RejectionReasons (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(InfractionsGQL, props.infractions)

  const [infraction, setInfraction] = useState(null)

  const findInfraction = (id) => {
    setInfraction(data.postRejectionReasons.edges.filter((item) => item.node.id === id)[0]?.node.infraction)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<NoteValues>({
    resolver: joiResolver(
      schema
    )
  })

  return (
    <form noValidate onSubmit={handleSubmit(props.onSubmit)}>
      <Stack spacing={3}>
        <FormControl isInvalid={errors.rejectionId}>
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
            {errors.rejectionId && errors.rejectionId.type === 'string.empty' && t('queue.post.actions.reject.modal.form.validation.rejectionId.empty')}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.note}>
          <FormLabel>
            {t('queue.post.actions.reject.modal.form.textarea.label')}
          </FormLabel>
          <Textarea
            resize='none'
            isInvalid={errors.note} {...register('note')}
            placeholder={t('queue.post.actions.reject.modal.form.textarea.placeholder')}
          />
          <FormErrorMessage>
            {errors.note && (errors.note.type === 'string.empty' || errors.note.type === 'string.min') && t('queue.post.actions.reject.modal.form.validation.note.empty')}
            {errors.note && errors.note.type === 'string.max' && t('queue.post.actions.reject.modal.form.validation.note.max')}
          </FormErrorMessage>
        </FormControl>
        {infraction &&
          <Alert borderRadius={5} mt={1} mb={1} status='warning'>
            <AlertIcon mt={1} mb={3} />
            <AlertDescription>{t('queue.post.actions.reject.modal.infraction')}
            </AlertDescription>
          </Alert>}
        <Flex justify='flex-end'>
          <Button
            isDisabled={errors.rejectionId || errors.note} isLoading={props.isModeratingPost} size='md'
            colorScheme='orange' type='submit'
          >{t('queue.post.actions.reject.modal.form.submit')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
