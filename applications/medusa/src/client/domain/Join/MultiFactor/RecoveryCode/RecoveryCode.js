/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks';
import { Flex, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import Button from '@//:modules/form/Button';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@//:modules/routing';
import PrepareViewer from '@//:modules/utilities/functions/prepareViewer/prepareViewer';
import StyledInput from '@//:modules/form/StyledInput/StyledInput';

type CodeValues = {
  code: string,
}

type Props = {}

const RecoveryCodeMutationGQL = graphql`
  mutation RecoveryCodeMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

export default function RecoveryCode (props: Props): Node {
  const [submitCode, isSubmittingCode] = useMutation(
    RecoveryCodeMutationGQL
  )

  const [t] = useTranslation('auth')

  const schema = Joi.object({
    code: Joi
      .string()
      .alphanum()
      .length(8)
      .required()
      .messages({
        'string.empty': t('multi_factor.recovery.form.validation.code.empty'),
        'string.length': t('multi_factor.recovery.form.validation.code.length'),
        'string.alphanum': t('multi_factor.recovery.form.validation.code.alphanum')
      })
  })

  const { register, setError, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const history = useHistory()

  const onSubmitCode = (formData) => {
    submitCode({
      variables: {
        input: {
          recoveryCode: formData.code
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation) {
          setError('code', {
            type: 'mutation',
            message: data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation
          })
          return
        }
        notify({
          status: 'success',
          isClosable: true,
          title: t('multi_factor.recovery.form.query.success')
        })
        history.push('/profile')
      },
      updater: (store) => {
        const payload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')

        PrepareViewer(store, payload)
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('multi_factor.recovery.form.query.error'),
          isClosable: true
        })
      }
    })
  }

  const success = isDirty && !errors.code && isSubmitted

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmitCode)}>
        <FormControl
          isInvalid={errors.code}
        >
          <FormLabel>{t('multi_factor.recovery.form.header')}</FormLabel>
          <Flex justify='center'>
            <StyledInput
              register={register('code')}
              success={success}
              error={errors.code}
              placeholder={t('multi_factor.recovery.form.placeholder')}
              errorMessage={errors.code?.message}
            />
            <Button
              size='md'
              variant='solid'
              type='submit'
              colorScheme='gray'
              disabled={errors.code}
              isLoading={isSubmittingCode}
              ml={2}
            >
              {t('multi_factor.recovery.form.submit')}
            </Button>
          </Flex>
        </FormControl>
      </form>
    </>
  )
}
