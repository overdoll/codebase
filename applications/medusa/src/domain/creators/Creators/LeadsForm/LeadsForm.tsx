import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
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
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t, Trans } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import Email from '@//:modules/validation/Email'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'

interface FormValues {
  email: string
  portfolio: string
  username: string
  details: string
}

const LeadsForm = ({
  isOpen,
  onClose
}): JSX.Element => {
  const { i18n } = useLingui()

  const schema = Joi.object({
    email: Email(),
    username: Joi
      .string()
      .required()
      .messages({
        'string.empty': i18n._(t`Please enter an username`)
      }),
    portfolio: Joi
      .string()
      .required()
      .uri()
      .messages({
        'string.empty': i18n._(t`Please enter a portfolio url`),
        'string.uri': i18n._(t`Please enter a valid url`)
      }),
    details: Joi
      .string()
      .allow('')
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {}
  })

  const onSubmit = (formValues): void => {
  }

  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
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
              isLoading={false}
              colorScheme='green'
              size='lg'
            >
              <Trans>
                Submit
              </Trans>
            </FormSubmitButton>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export default LeadsForm
