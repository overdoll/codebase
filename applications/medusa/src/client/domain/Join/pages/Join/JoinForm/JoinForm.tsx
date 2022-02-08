import Joi from 'joi'
import { FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Email from '@//:modules/validation/Email'

interface JoinValues {
  email: string
}

interface Props {
  onSubmit: (JoinValues) => void
  loading: boolean
}

export default function JoinForm ({
  onSubmit,
  loading
}: Props): JSX.Element {
  const schema = Joi.object({
    email: Email()
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<JoinValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const success = isDirty && (errors.email == null) && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl
          isInvalid={errors.email != null}
          id='email'
        >
          <FormLabel
            zIndex={1}
            htmlFor='email'
            variant='float'
            color={!success
              ? (errors.email != null)
                  ? 'orange.500'
                  : 'gray.200'
              : 'green.600'}
          >
            <Trans>
              Email
            </Trans>
          </FormLabel>
          <StyledInput
            register={register('email')}
            success={success}
            error={errors.email != null}
            placeholder={
              i18n._(t`Enter an email`)
            }
            errorMessage={errors.email?.message}
            size='xl'
          />
        </FormControl>
        <Button
          size='xl'
          variant='outline'
          type='submit'
          isLoading={loading}
          colorScheme='primary'
          w='100%'
        >
          <Trans>
            Continue
          </Trans>
        </Button>
      </Stack>
    </form>
  )
}
