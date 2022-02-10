import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, FormControl, FormLabel, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { useHistory } from '@//:modules/routing'
import { prepareViewer } from '../../../helpers/support'
import type { TotpSubmissionFragment$key } from '@//:artifacts/TotpSubmissionFragment.graphql'
import { TotpSubmissionMutation } from '@//:artifacts/TotpSubmissionMutation.graphql'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import Totp from '@//:modules/validation/Totp'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import StyledInput from '@//:modules/content/ThemeComponents/StyledInput/StyledInput'
import Button from '@//:modules/form/Button/Button'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'

interface CodeValues {
  code: string
}

interface Props {
  queryRef: TotpSubmissionFragment$key
}

const Fragment = graphql`
  fragment TotpSubmissionFragment on AuthenticationToken {
    token
  }
`

const Mutation = graphql`
  mutation TotpSubmissionMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
      validation
      account {
        id
      }
    }
  }
`

export default function TotpSubmission ({ queryRef }: Props): JSX.Element {
  const data = useFragment(Fragment, queryRef)

  const [submitTotp, isSubmittingTotp] = useMutation<TotpSubmissionMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    code: Totp()
  })

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

  const onSubmitTotp = (formData): void => {
    submitTotp({
      variables: {
        input: {
          code: formData.code,
          token: data.token
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: i18n._(translateValidation(data.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Welcome back! Thanks for using two-factor to log in!`,
          isClosable: true
        })
      },
      updater: (store) => {
        history.push('/')
        const payload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp').getLinkedRecord('account')
        prepareViewer(store, payload)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error submitting the authentication code`,
          isClosable: true
        })
      }
    })
  }

  const success = isDirty && (errors.code == null) && isSubmitted

  return (
    <>
      <Box>
        <Icon
          icon={BadgeCircle}
          w={100}
          h={100}
          fill='primary.500'
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading
          align='center'
          fontSize='xl'
          color='gray.00'
        >
          <Trans>
            Enter the 6-digit code from your Authenticator app
          </Trans>
        </Heading>
        <Text
          align='center'
          fontSize='sm'
          color='gray.200'
        >
          <Trans>
            You can find this in the same app you used to set up two-factor authentication
          </Trans>
        </Text>
      </Box>
      <form noValidate onSubmit={handleSubmit(onSubmitTotp)}>
        <FormControl
          isInvalid={errors.code != null}
        >
          <Stack spacing={3}>
            <FormControl
              isInvalid={errors.code != null}
              id='email'
            >
              <FormLabel
                zIndex={1}
                htmlFor='code'
                variant='float'
                color={!success
                  ? (errors.code != null)
                      ? 'orange.500'
                      : 'gray.200'
                  : 'green.600'}
              >
                <Trans>
                  Code
                </Trans>
              </FormLabel>
              <StyledInput
                register={register('code')}
                success={success}
                error={errors.code != null}
                size='xl'
                variant='filled'
                placeholder='123456'
                errorMessage={errors?.code?.message}
              />
            </FormControl>
            <Button
              size='xl'
              variant='outline'
              type='submit'
              ml={2}
              colorScheme='primary'
              isDisabled={errors.code != null}
              isLoading={isSubmittingTotp}
            >
              <Trans>
                Submit Code
              </Trans>
            </Button>
          </Stack>
        </FormControl>
      </form>
    </>
  )
}
