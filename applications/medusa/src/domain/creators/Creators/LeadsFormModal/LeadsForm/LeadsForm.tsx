import { graphql, useMutation } from 'react-relay/hooks'
import { t, Trans } from '@lingui/macro'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Stack, Text, useToast } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  InputHelperText,
  TextareaInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import React from 'react'
import { useLingui } from '@lingui/react'
import { LeadsFormMutation } from '@//:artifacts/LeadsFormMutation.graphql'

const Mutation = graphql`
  mutation LeadsFormMutation ($input: NewCreatorLeadInput!) {
    newCreatorLead(input: $input) {
      validation
    }
  }
`
const LeadsForm = ({
  methods,
  isFinalized,
  onFinalize
}) => {
  const { i18n } = useLingui()
  const [commit, IsInFlight] = useMutation<LeadsFormMutation>(Mutation)
  const notify = useToast()

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          username: formValues.username,
          email: formValues.email,
          portfolio: formValues.portfolio,
          details: formValues.details
        }
      },
      onCompleted () {
        onFinalize()
        notify({
          status: 'success',
          title: t`Thank you for your submission! We'll be in touch.`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error sending your information.`
        })
      }
    })
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <ModalCloseButton
        size='lg'
        as={CloseButton}
      />
      <ModalHeader>
        <Trans>
          Hold on!
        </Trans>
      </ModalHeader>
      <ModalBody>
        <Stack spacing={3}>
          <Text mb={2}>
            <Trans>
              At the moment, overdoll is <strong>invite-only</strong>. Please fill out the form
              below and we'll reach out to you as soon as possible!
            </Trans>
          </Text>
          <FormInput size='md' id='username'>
            <InputHeader>
              <Trans>
                Your Name
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`xXx_NoScope360_xXx`)} />
              <InputFeedback />
            </InputBody>
            <InputFooter>
              <InputHelperText>
                <Trans>
                  This can be your username or any alias you go by.
                </Trans>
              </InputHelperText>
            </InputFooter>
          </FormInput>
          <FormInput size='md' id='email'>
            <InputHeader>
              <Trans>
                Your Email
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`starcraft_pro_2010@hotmail.com`)} />
              <InputFeedback />
            </InputBody>
            <InputFooter>
              <InputHelperText>
                <Trans>
                  We prefer to contact you by email, if possible.
                </Trans>
              </InputHelperText>
            </InputFooter>
          </FormInput>
          <FormInput size='md' id='portfolio'>
            <InputHeader>
              <Trans>
                Link to your portfolio
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`https://twitter.com/overdoll_com`)} />
              <InputFeedback />
            </InputBody>
            <InputFooter>
              <InputHelperText>
                <Trans>
                  Link a website that has some of your work, such as Twitter.
                </Trans>
              </InputHelperText>
            </InputFooter>
          </FormInput>
          <FormInput size='md' id='details'>
            <InputHeader>
              <Trans>
                Anything else we should know?
              </Trans>
            </InputHeader>
            <InputBody>
              <TextareaInput variant='filled' />
              <InputFeedback />
            </InputBody>
            <InputFooter>
              <InputHelperText>
                <Trans>
                  Enter anything else you'd like to tell us.
                </Trans>
              </InputHelperText>
            </InputFooter>
          </FormInput>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <FormSubmitButton
          isLoading={IsInFlight}
          colorScheme='green'
          size='lg'
        >
          <Trans>
            Submit
          </Trans>
        </FormSubmitButton>
      </ModalFooter>
    </Form>
  )
}

export default LeadsForm
