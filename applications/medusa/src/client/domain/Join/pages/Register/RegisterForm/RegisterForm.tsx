import Joi from 'joi'
import { FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import Username from '@//:modules/validation/Username'

interface RegisterValues {
  username: string
}

interface Props {
  onSubmit: (RegisterValues) => void
  loading: boolean
}

export default function RegisterForm ({
  onSubmit,
  loading
}: Props): JSX.Element {
  const schema = Joi.object({
    username: Username()
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && (errors.username == null) && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl
          isInvalid={errors.username != null}
          id='username'
        >
          <FormLabel
            htmlFor='username'
            variant='float'
            color={!success
              ? (errors.username != null)
                  ? 'orange.500'
                  : 'gray.200'
              : 'green.600'}
          >
            <Trans>
              Username
            </Trans>
          </FormLabel>
          <StyledInput
            size='xl'
            register={register('username')}
            success={success}
            error={errors.username != null}
            placeholder={t`Enter a username`}
            errorMessage={errors.username?.message}
          />
        </FormControl>
        <Button
          size='xl'
          variant='outline'
          type='submit'
          isLoading={loading}
          colorScheme='green'
          w='100%'
        >
          <Trans>
            Register
          </Trans>
        </Button>
      </Stack>
    </form>
  )
}
