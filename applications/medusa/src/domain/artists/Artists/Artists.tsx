import { PageProps } from '@//:types/app'
import { t, Trans } from '@lingui/macro'
import {
  Box,
  Flex,
  Heading,
  keyframes,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import Button from '@//:modules/form/Button/Button'
import SiteLinkLogo from '../../app/Root/DisposeRoot/ResultRoot/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import React from 'react'
import Image from 'next/future/image'
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
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import { useLingui } from '@lingui/react'
import Email from '@//:modules/validation/Email'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'

interface FormValues {
  email: string
  portfolio: string
  username: string
  details: string
}

const Artists: PageProps<{}> = () => {
  const topBubbles = keyframes`
  0%{
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
}
  10% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
  20% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  `

  const bottomBubbles = keyframes`
  0%{
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
}
  10% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
  20% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  `

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

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

  const useOverdoll = (): JSX.Element => (
    <Button
      onClick={onOpen}
      colorScheme='orange'
      size='lg'
      leftIcon={<Icon icon={PremiumStar} w={5} h={5} fill='orange.900' />}
      _before={{
        display: 'block',
        animation: `${topBubbles} ease-in-out 5s forwards infinite`,
        transition: 'all ease-in-out 0.5s',
        top: '-75%',
        position: 'absolute',
        content: '""',
        width: '110%',
        height: '100%',
        zIndex: -1000,
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, transparent 20%, var(--od-colors-orange-300) 20%, transparent 30%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, transparent 10%, var(--od-colors-orange-300) 15%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%)',
        backgroundSize: '10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%'
      }}
      _after={{
        display: 'block',
        animation: `${bottomBubbles} ease-in-out 5s forwards infinite`,
        bottom: '-75%',
        transition: 'all ease-in-out 0.5s',
        position: 'absolute',
        content: '""',
        width: '110%',
        height: '100%',
        zIndex: -1000,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%',
        backgroundImage: 'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle,  transparent 10%, var(--od-colors-orange-300) 15%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%)'
      }}
    >
      <Trans>
        Start using overdoll
      </Trans>
    </Button>
  )

  return (
    <>
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
                    below and we'll reach out to you in the next few days.
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
      <Flex flexDirection='column'>
        <Flex zIndex={10} p={5} w='100%'>
          <SiteLinkLogo />
          <Box ml='auto'>
            <LinkButton
              href='/'
              borderRadius='lg'
              colorScheme='primary'
            >
              <Trans>
                I'm not an artist
              </Trans>
            </LinkButton>
          </Box>
        </Flex>
        <Flex padding='70px 45px'>
          <Box
            margin='0 auto'
            padding='75px 0'
            position='relative'
            textAlign='center'
            width='100%'
            zIndex={10}
            maxWidth='640px'
          >
            <Heading
              textShadow='-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              fontSize='6xl'
              color='white'
              lineHeight='1.1'
            >
              <Trans>
                The next platform for 18+ creators.
              </Trans>
            </Heading>
            <Box mt={10} />
            {useOverdoll()}
          </Box>
          <Flex
            left={0}
            top={0}
            bottom={0}
            position='absolute'
            right={0}
            height={['500px', '690px', '733px']}
          >
            <Image
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
              src='/desktop-large.jpg'
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position='absolute'
              backgroundColor='rgba(0,0,0,0.4)'
              backgroundImage='linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8))'
            />

          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Artists
