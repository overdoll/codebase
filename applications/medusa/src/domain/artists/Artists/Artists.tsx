import { LargeBackgroundBox, PageWrapper } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import { t, Trans } from '@lingui/macro'
import {
  Box,
  Flex,
  Heading,
  HStack,
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
import { OverdollLogo } from '@//:assets/logos'
import { FileUpload, PremiumStar, SearchSmall } from '@//:assets/icons'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import ContactButton from '@//:common/components/Contact/ContactButton'
import PlatformShareDirectButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareDirectButton/PlatformShareDirectButton'
import PlatformShareDiscordButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareDiscordButton/PlatformShareDiscordButton'
import PlatformShareRedditButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareRedditButton/PlatformShareRedditButton'
import PlatformShareTwitterButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareTwitterButton/PlatformShareTwitterButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import RootPostsWaterfall from './RootPostsWaterfall/RootPostsWaterfall'
import { ExternalLink } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'
import ArtistsRichObject from '@//:common/rich-objects/artists/ArtistsRichObject/ArtistsRichObject'
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

interface FormValues {
  email: string
  portfolio: string
  username: string
  details: string
}

const Artists: PageProps<{}> = () => {
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

  return (
    <>
      <Modal
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        size="lg"
      >
        <ModalOverlay/>
        <ModalContent>
          <Form {...methods} onSubmit={onSubmit}>
            <ModalCloseButton
              size="lg"
              as={CloseButton}
            />
            <ModalHeader>
              <Trans>
                Thank you for choosing overdoll
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
                <FormInput size="md" id="username">
                  <InputHeader>
                    <Trans>
                      Your Name
                    </Trans>
                  </InputHeader>
                  <InputBody>
                    <TextInput placeholder={i18n._(t`xXx_NoScope360_xXx`)}/>
                    <InputFeedback/>
                  </InputBody>
                  <InputFooter>
                    <InputHelperText>
                      <Trans>
                        This can be your username or any alias you go by.
                      </Trans>
                    </InputHelperText>
                  </InputFooter>
                </FormInput>
                <FormInput size="md" id="email">
                  <InputHeader>
                    <Trans>
                      Your Email
                    </Trans>
                  </InputHeader>
                  <InputBody>
                    <TextInput placeholder={i18n._(t`starcraft_pro_2010@hotmail.com`)}/>
                    <InputFeedback/>
                  </InputBody>
                  <InputFooter>
                    <InputHelperText>
                      <Trans>
                        We prefer to contact you by email, if possible.
                      </Trans>
                    </InputHelperText>
                  </InputFooter>
                </FormInput>
                <FormInput size="md" id="portfolio">
                  <InputHeader>
                    <Trans>
                      Link to your portfolio
                    </Trans>
                  </InputHeader>
                  <InputBody>
                    <TextInput placeholder={i18n._(t`https://twitter.com/overdoll_com`)}/>
                    <InputFeedback/>
                  </InputBody>
                  <InputFooter>
                    <InputHelperText>
                      <Trans>
                        Link a website that has some of your work, such as Twitter.
                      </Trans>
                    </InputHelperText>
                  </InputFooter>
                </FormInput>
                <FormInput size="md" id="details">
                  <InputHeader>
                    <Trans>
                      Anything else we should know?
                    </Trans>
                  </InputHeader>
                  <InputBody>
                    <TextareaInput variant="filled"/>
                    <InputFeedback/>
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
                colorScheme="green"
                size="lg"
              >
                <Trans>
                  Submit
                </Trans>
              </FormSubmitButton>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
      <Flex flexDirection="column">
        <Flex zIndex={10} p={5} w="100%">
          <SiteLinkLogo/>
          <Box ml="auto">
            <LinkButton
              href="/"
              borderRadius="lg"
              colorScheme="primary"
            >
              <Trans>
                I'm not an artist
              </Trans>
            </LinkButton>
          </Box>
        </Flex>
        <Flex padding="70px 45px">
          <Box
            margin="0 auto"
            padding="75px 0"
            position="relative"
            textAlign="center"
            width="100%"
            zIndex={10}
            maxWidth="640px"
          >
            <Heading fontSize="4xl" color="white" lineHeight="1.1">
              <Trans>
                The next platform for digital adult artists.
              </Trans>
            </Heading>
            <Text mt={3} fontSize="md" color="white">
              <Trans>
                Created for adult artists of the future.
              </Trans>
            </Text>
            <Button mt={5} onClick={onOpen} colorScheme="orange" size="lg">
              <Trans>
                I want to use overdoll
              </Trans>
            </Button>
          </Box>
          <Flex
            left={0}
            top={0}
            bottom={0}
            position="absolute"
            right={0}
            height={['500px', '690px', '733px']}
          >
            <Image
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
              src="/desktop-large.jpg"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              backgroundColor="rgba(0,0,0,0.4)"
              backgroundImage="linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8))"
            />

          </Flex>
        </Flex>
      </Flex>
    </>
  )

  const HEADER_PROPS =
    {
      color: 'gray.00',
      fontSize:
        '3xl'
    }

  const TEXT_PROPS =
    {
      color: 'gray.00',
      fontSize:
        'lg'
    }

  const ICON_PROPS =
    {
      h: 6,
      w:
        6,
      fill:
        'gray.00'
    }

  const BOX_PROPS =
    {
      borderRadius: 'lg',
      bg:
        'whiteAlpha.200',
      backdropFilter:
        'blur(20px)',
      p:
        4,
      borderWidth:
        3,
      borderColor:
        'whiteAlpha.100'
    }

  return (
    <>
      <ArtistsRichObject/>
      <PageWrapper zIndex={1}>
        <Stack spacing={24}>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={1}>
              <HStack spacing={1}>
                <Icon
                  icon={OverdollLogo}
                  w={10}
                  h={10}
                  fill="primary.400"
                />
                <Heading {...HEADER_PROPS} color="primary.400">
                  <Trans>
                    overdoll
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  overdoll is the first true digital content platform, built for the adult content artist
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={FileUpload}
                  {...ICON_PROPS}
                  fill="teal.300"
                />
                <Heading {...HEADER_PROPS} color="teal.300">
                  <Trans>
                    Upload and Categorize
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  High quality videos, drawings, renders - anything, as long as it's digitally produced adult content
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Add categories and characters to your post to make it easy to find across the platform
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={SearchSmall}
                  {...ICON_PROPS}
                  fill="purple.300"
                />
                <Heading {...HEADER_PROPS} color="purple.300">
                  <Trans>
                    Discover and Browse
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Use search and tags to easily find your content
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Share your unique link, giving your fans the best mobile content experience
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={PremiumStar}
                  {...ICON_PROPS}
                  fill="orange.300"
                />
                <Heading {...HEADER_PROPS} color="orange.300">
                  <Trans>
                    Monetize Exclusive Content
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Mark content in your posts as exclusive
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Let your fans become paid supporters to get access to the content
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={16}>
              <Stack spacing={8}>
                <Stack spacing={2}>
                  <Heading {...TEXT_PROPS} color="gray.00">
                    <Trans>
                      Ready to start posting your content? Contact us!
                    </Trans>
                  </Heading>
                  <ContactButton colorScheme="whiteAlpha" size="lg" w="100%"/>
                </Stack>
                <Stack spacing={2}>
                  <Heading {...TEXT_PROPS} color="gray.00">
                    <Trans>
                      We can also reach out to you - just send us your details!
                    </Trans>
                  </Heading>
                  <ExternalLink
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd_mOJxnNyEciEIQs5nmkJoBseJhOPOCAJ4DR-quXuzp0AOLg/viewform"
                  >
                    <Button colorScheme="whiteAlpha" w="100%" size="lg">
                      <Trans>
                        Open Form Link
                      </Trans>
                    </Button>
                  </ExternalLink>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Heading {...TEXT_PROPS} color="gray.00">
                  <Trans>
                    Not an artist? Let your favorite artist know about us!
                  </Trans>
                </Heading>
                <HStack justify="center" spacing={2}>
                  <PlatformShareDirectButton/>
                  <PlatformShareDiscordButton/>
                  <PlatformShareRedditButton/>
                  <PlatformShareTwitterButton/>
                </HStack>
              </Stack>
              <Stack spacing={2}>
                <Heading {...TEXT_PROPS} color="gray.00">
                  <Trans>
                    ...or, you can just browse our content!
                  </Trans>
                </Heading>
                <LinkButton colorScheme="whiteAlpha" w="100%" size="lg" href="/">
                  <Trans>
                    Browse Content
                  </Trans>
                </LinkButton>
              </Stack>
            </Stack>
          </LargeBackgroundBox>
          <Icon
            icon={OverdollLogo}
            w={8}
            h={8}
            fill="whiteAlpha.500"
          />
        </Stack>
      </PageWrapper>
      <RootPostsWaterfall/>
    </>
  )
}

export default Artists
