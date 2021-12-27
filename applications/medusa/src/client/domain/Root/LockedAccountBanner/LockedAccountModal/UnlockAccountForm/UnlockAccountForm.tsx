import { Checkbox, FormControl, FormErrorMessage, Stack, useToast } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { UnlockAccountFormMutation } from '@//:artifacts/UnlockAccountFormMutation.graphql'

interface FormValues {
  checkbox: boolean
}

const Mutation = graphql`
  mutation UnlockAccountFormMutation {
    unlockAccount {
      account {
        id
        lock {
          expires
          reason
        }
        isModerator
        isStaff
      }
    }
  }
`

export default function UnlockAccountForm (): JSX.Element | null {
  const [unlockAccount, isUnlockingAccount] = useMutation<UnlockAccountFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    checkbox: Joi
      .boolean()
      .required()
      .valid(true)
      .messages({
        'any.only': i18n._(t`You must agree to follow the community guidelines`)
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
    unlockAccount({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your account has been unlocked`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error unlocking your account`,
          isClosable: true
        })
      }
    })
  }

  const notify = useToast()

  return (
    <form noValidate onSubmit={handleSubmit(onUnlockAccount)}>
      <Stack spacing={3}>
        <FormControl isInvalid={errors.checkbox != null}>
          <Controller
            control={control}
            name='checkbox'
            render={({
              field: {
                onChange,
                value
              },
              fieldState: {
                invalid
              }
            }) => (
              <Checkbox
                onChange={onChange}
                isChecked={value}
                isInvalid={invalid}
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
          isLoading={isUnlockingAccount}
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
