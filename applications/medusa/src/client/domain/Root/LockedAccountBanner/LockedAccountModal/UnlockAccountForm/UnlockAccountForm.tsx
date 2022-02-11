import { Checkbox, FormControl, FormErrorMessage, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UnlockAccountFormMutation } from '@//:artifacts/UnlockAccountFormMutation.graphql'
import { UnlockAccountFormFragment$key } from '@//:artifacts/UnlockAccountFormFragment.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
interface FormValues {
  checkbox: boolean
}

interface Props {
  queryRef: UnlockAccountFormFragment$key
}

const Mutation = graphql`
  mutation UnlockAccountFormMutation($input: UnlockAccountInput!) {
    unlockAccount(input: $input) {
      account {
        id
        lock {
          expires
        }
        isModerator
        isStaff
      }
    }
  }
`

const UnlockAccountFormGQL = graphql`
  fragment UnlockAccountFormFragment on Account {
    id
  }
`

export default function UnlockAccountForm ({ queryRef }: Props): JSX.Element | null {
  const [unlockAccount, isUnlockingAccount] = useMutation<UnlockAccountFormMutation>(Mutation)

  const data = useFragment(UnlockAccountFormGQL, queryRef)

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
      variables: {
        input: {
          accountID: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your account has been unlocked`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error unlocking your account`
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
          isDisabled={errors.checkbox != null}
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
