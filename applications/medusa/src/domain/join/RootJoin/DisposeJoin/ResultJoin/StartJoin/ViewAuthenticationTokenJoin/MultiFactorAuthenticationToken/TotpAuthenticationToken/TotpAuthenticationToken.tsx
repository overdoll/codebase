import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { Center, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import type { TotpAuthenticationTokenFragment$key } from '@//:artifacts/TotpAuthenticationTokenFragment.graphql'
import { TotpAuthenticationTokenMutation } from '@//:artifacts/TotpAuthenticationTokenMutation.graphql'
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
import { RegisterAccount } from '@//:assets/icons'
import useGrantCleanup from '../../../support/useGrantCleanup'
import Head from 'next/head'
import RevokeViewAuthenticationTokenButton
  from '../../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import Button from '@//:modules/form/Button/Button'
import identifyAccount from '@//:modules/external/identifyAccount'

interface CodeValues {
  code: string
}

interface Props {
  query: TotpAuthenticationTokenFragment$key
  onUseTotp: () => void
}

const Fragment = graphql`
  fragment TotpAuthenticationTokenFragment on AuthenticationToken {
    id
    token
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

const Mutation = graphql`
  mutation TotpAuthenticationTokenMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!) {
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
        ...AccountIconFragment
        ...identifyAccountFragment
      }
    }
  }
`

export default function TotpAuthenticationToken (props: Props): JSX.Element {
  const {
    query,
    onUseTotp
  } = props

  const data = useFragment(Fragment, query)

  const [submitTotp, isSubmittingTotp] = useMutation<TotpAuthenticationTokenMutation>(Mutation)

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
        identifyAccount({ query: data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.account ?? null })
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
      <Head>
        <title>Two-factor authentication - overdoll</title>
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
            Enter the 6-digit code from your Authenticator app.
          </Trans>
        </Heading>
        <Form {...methods} onSubmit={onSubmitTotp}>
          <Stack spacing={3}>
            <FormInput size='xl' id='code'>
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
              size='xl'
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
        <Button onClick={onUseTotp} variant='ghost' size='sm'>
          <Trans>
            I lost access to my device
          </Trans>
        </Button>
      </Stack>
    </>
  )
}
