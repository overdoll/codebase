import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'

interface FormValues {
  name: string
}

interface Props extends ComponentChoiceArguments<any> {
  isOpen: boolean
  onClose: () => void
}

export default function UploadAddCharacterRequest (props: Props): JSX.Element {
  const {
    register,
    isOpen,
    onClose
  } = props

  const { i18n } = useLingui()

  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(120)
      .messages({
        'string.empty': i18n._(t`Please enter a name for the requested character`),
        'string.min': i18n._(t`The name must be at least 2 characters`),
        'string.max': i18n._(t`The name cannot exceed 120 characters`)
      })
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    const registerReturn = register(formValues.name, {
      name: formValues.name,
      isRequest: true
    })
    registerReturn.onChange()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody p={4}>
            <Stack pt={10} justify='center' align='center' spacing={6}>
              <Alert
                status='info'
              >
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    If you can't find the character you're looking for, you can request for the missing character to be
                    added. This will let you submit the post even though the character does not yet exist.
                  </Trans>
                </AlertDescription>
              </Alert>
              <Form
                onSubmit={onSubmit}
                {...methods}
              >
                <Stack spacing={4}>
                  <FormInput size='lg' id='name'>
                    <InputHeader>
                      <Trans>
                        Character Name
                      </Trans>
                    </InputHeader>
                    <InputBody>
                      <TextInput placeholder={i18n._(t`Your requested character name`)} />
                      <InputFeedback />
                    </InputBody>
                    <InputFooter />
                  </FormInput>
                  <FormSubmitButton
                    w='100%'
                    size='lg'
                    colorScheme='teal'
                  >
                    <Trans>
                      Submit
                    </Trans>
                  </FormSubmitButton>
                </Stack>
              </Form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
