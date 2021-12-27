import { Checkbox, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'

interface FormValues {
  checkbox: boolean
}

export default function UnlockAccountForm (): JSX.Element | null {
  const { i18n } = useLingui()

  const schema = Joi.object({
    checkbox: Joi
      .boolean()
      .required()
      .messages({
        'any.required': i18n._(t`You must agree to follow the community guidelines`)
      })
  })

  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      checkbox: false
    }
  })

  const onUnlockAccount = (): void => {
    console.log('submitted')
  }

  return (
    <form noValidate onSubmit={handleSubmit(onUnlockAccount)}>

      <Stack spacing={3}>
        <FormControl isInvalid={errors.checkbox != null}>
          <Controller
            name='checkbox'
            control={control}
            render={({ field }) =>
              (<Checkbox
                {...field}
                colorScheme='green'
                size='md'
              >
                <Trans>
                  I promise to be better and to follow the community guidelines more closely
                </Trans>
              </Checkbox>
              )}
          />
          <FormErrorMessage>
            {errors?.checkbox?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          disabled={errors.checkbox != null}
          type='submit'
          colorScheme='green'
          size='lg'
        >
          <Trans>
            Unlock Account
          </Trans>
        </Button>
      </Stack>

    </form>
  )
}
