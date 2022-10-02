import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Center, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { RecoveryCodeAuthenticationTokenMutation } from '@//:artifacts/RecoveryCodeAuthenticationTokenMutation.graphql'
import {
  RecoveryCodeAuthenticationTokenFragment$key
} from '@//:artifacts/RecoveryCodeAuthenticationTokenFragment.graphql'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import translateValidation from '@//:modules/validation/translateValidation'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { RegisterAccount } from '@//:assets/icons'
import useGrantCleanup from '../../../support/useGrantCleanup'
import { Icon } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import RevokeViewAuthenticationTokenButton
  from '../../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import Button from '@//:modules/form/Button/Button'
import identifyAccount from '@//:modules/external/identifyAccount'

interface CodeValues {
  code: string
}

interface Props {
  query: RecoveryCodeAuthenticationTokenFragment$key
  onUseTotp: () => void
}

const Mutation = graphql`
  mutation RecoveryCodeAuthenticationTokenMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
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
        ...AccountIconFragment
        ...identifyAccountFragment
      }
    }
  }
`

const Fragment = graphql`
  fragment RecoveryCodeAuthenticationTokenFragment on AuthenticationToken {
    id
    token
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

export default function RecoveryCodeAuthenticationToken (props: Props): JSX.Element {
  const {
    query,
    onUseTotp
  } = props

  const data = useFragment(Fragment, query)

  const [submitCode, isSubmittingCode] = useMutation<RecoveryCodeAuthenticationTokenMutation>(
    Mutation
  )

  const { i18n } = useLingui()

  const schema = Joi.object({
    code: Joi
      .string()
      .alphanum()
      .length(8)
      .required()
      .messages({
        'string.empty': i18n._(t`Please enter a recovery code`),
        'string.length': i18n._(t`A recovery code must be 8 characters long`),
        'string.alphanum': i18n._(t`A recovery code can only contain numbers and letters`)
      })
  })

  const methods = useForm<CodeValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

  const notify = useToast()

  const {
    successfulGrant,
    invalidateGrant
  } = useGrantCleanup()

  const onSubmitCode = ({ code }: CodeValues): void => {
    submitCode({
      variables: {
        input: {
          token: data.token,
          recoveryCode: code
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation != null) {
          setError('code', {
            type: 'mutation',
            message: i18n._(translateValidation(data.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode.validation))
          })
          return
        }
        identifyAccount({ query: data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.account ?? null })
        notify({
          status: 'success',
          title: t`A recovery code was successfully used up to log you in`
        })
      },
      updater: (store, payload) => {
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.validation === 'TOKEN_INVALID') {
          invalidateGrant(store, data.id)
          return
        }
        if (payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.account?.id != null) {
          const viewerPayload = store.getRootField('grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode').getLinkedRecord('account')
          successfulGrant(store, viewerPayload, payload?.grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode?.revokedAuthenticationTokenId)
        }
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error submitting a recovery code`
        })
      }
    })
  }

  return (
    <>
      <Head>
        <title>Recovery codes - overdoll</title>
      </Head>
      <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
        <Grid w='100%' templateColumns='1fr 1fr 1fr'>
          <GridItem>
            <Flex h='100%' align='center'>
              <RevokeViewAuthenticationTokenButton query={data} />
            </Flex>
          </GridItem>
          <GridItem>
            <Center>
              <Icon
                icon={RegisterAccount}
                w={16}
                h={16}
                fill='gray.00'
              />
            </Center>
          </GridItem>
          <GridItem />
        </Grid>
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            Enter an 8-character recovery code to log in.
          </Trans>
        </Heading>
        <Form {...methods} onSubmit={onSubmitCode}>
          <Stack spacing={4} justify='space-between'>
            <FormInput size='xl' id='code'>
              <InputBody>
                <TextInput
                  borderColor='transparent'
                  variant='outline'
                  placeholder={i18n._(t`An 8-character recovery code`)}
                />
                <InputFeedback />
              </InputBody>
              <InputFooter />
            </FormInput>
            <FormSubmitButton
              size='xl'
              variant='solid'
              colorScheme='primary'
              isLoading={isSubmittingCode}
            >
              <Trans>
                Submit
              </Trans>
            </FormSubmitButton>
          </Stack>
        </Form>
        <Button onClick={onUseTotp} variant='ghost' size='sm'>
          <Trans>
            Use authenticator app instead
          </Trans>
        </Button>
      </Stack>
    </>
  )
}
