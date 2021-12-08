/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import { useHistory } from '@//:modules/routing'
import PrepareViewer from '../../helpers/PrepareViewer'

type CodeValues = {
  code: string,
}

type Props = {}

const RecoveryCodeMutationGQL = graphql`
  mutation RecoveryCodeFormMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

const RecoveryCodeFragment = graphql`
  fragment RecoveryCodeFragment on AuthenticationToken {
    id
  }
`

const schema = Joi.object({
  code: Joi
    .string()
    .alphanum()
    .length(8)
    .required()
})

export default function RecoveryCode ({ queryRef }: Props): Node {
  const [submitCode, isSubmittingCode] = useMutation(
    RecoveryCodeMutationGQL
  )

  const data = useFragment(RecoveryCodeFragment, queryRef)

  const [t] = useTranslation('auth')

  const {
    register,
    setError,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<CodeValues>({
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
        store.delete(data.id)
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
            <InputGroup mr={2} size='sm'>
              <Input
                {...register('code')}
                variant='outline'
                size='md'
                placeholder={t('multi_factor.recovery.form.placeholder')}
              />
              {(errors.code || success) && (
                <InputRightElement h='100%' mr={1}>
                  <Icon
                    m={2}
                    icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                    fill={success ? 'green.600' : 'orange.500'}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <Button
              size='md'
              variant='solid'
              type='submit'
              colorScheme='gray'
              disabled={errors.code}
              isLoading={isSubmittingCode}
            >
              {t('multi_factor.recovery.form.submit')}
            </Button>
          </Flex>
          <FormErrorMessage>
            {errors.code && errors.code.type === 'mutation' && errors.code.message}
            {errors.code && errors.code.type === 'string.empty' && t('multi_factor.recovery.form.validation.code.empty')}
            {errors.code && errors.code.type === 'string.length' && t('multi_factor.recovery.form.validation.code.length')}
            {errors.code && errors.code.type === 'string.alphanum' && t('multi_factor.recovery.form.validation.code.alphanum')}
          </FormErrorMessage>
        </FormControl>
      </form>
    </>
  )
}
