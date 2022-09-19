import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Box, Heading, Stack } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import type { TotpSubmissionFragment$key } from '@//:artifacts/TotpSubmissionFragment.graphql'
import { TotpSubmissionMutation } from '@//:artifacts/TotpSubmissionMutation.graphql'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import Totp from '@//:modules/validation/Totp'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { MobilePhone, WarningTriangle } from '@//:assets/icons'
import { FlowBuilderNextButton } from '@//:modules/content/PageLayout'
import useGrantCleanup from '../../../support/useGrantCleanup'

interface CodeValues {
  code: string
}

interface Props {
  queryRef: TotpSubmissionFragment$key
}

const Fragment = graphql`
  fragment TotpSubmissionFragment on AuthenticationToken {
    id
    token
  }
`

const Mutation = graphql`
  mutation TotpSubmissionMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
      revokedAuthenticationTokenId
      validation
      account {
        id
        username
        isModerator
        isStaff
        isArtist
        deleting {
          __typename
        }
        lock {
          __typename
        }
        avatar {
          ...ResourceItemFragment
        }
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

  const methods = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

  const { setError } = methods

  const notify = useToast()

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
          title: t`Welcome back! Thanks for using two-factor to log in!`
        })
      },
      updater: (store, payload) => {
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.validation === 'TOKEN_INVALID') {
          invalidateGrant(store, data.id)
          return
        }

        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.account?.id != null) {
          const viewerPayload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp').getLinkedRecord('account')
          successfulGrant(store, viewerPayload, payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.revokedAuthenticationTokenId)
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error submitting the authentication code`
        })
      }
    })
  }

  return (
    <>
      <Icon
        icon={MobilePhone}
        w={16}
        h={16}
        fill='primary.400'
      />
      <Box>
        <Heading
          textAlign='center'
          fontSize='xl'
          color='gray.00'
          mb={1}
        >
          <Trans>
            Enter the 6-digit code from your Authenticator app
          </Trans>
        </Heading>
        <Heading textAlign='center' color='gray.300' fontSize='sm'>
          <Trans>
            You can find this code in the same app you used to set up two-factor authentication
          </Trans>
        </Heading>
      </Box>
      <Form {...methods} onSubmit={onSubmitTotp}>
        <Stack spacing={3}>
          <FormInput size='lg' id='code'>
            <InputBody>
              <TextInput
                borderColor='transparent'
                variant='outline'
                placeholder='123456'
              />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            size='lg'
            variant='solid'
            colorScheme='primary'
            isLoading={isSubmittingTotp}
          >
            <Trans>
              Submit Code
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
      <FlowBuilderNextButton
        size='md'
        rightIcon={<Icon w={4} h={4} icon={WarningTriangle} fill='inherit' />}
      >
        <Trans>
          I lost access to my device
        </Trans>
      </FlowBuilderNextButton>
    </>
  )
}
