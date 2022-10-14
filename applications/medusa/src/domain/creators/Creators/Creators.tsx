import { PageProps } from '@//:types/app'
import { t, Trans } from '@lingui/macro'
import { Accordion, Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import SiteLinkLogo from '../../app/Root/DisposeRoot/ResultRoot/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import React, { useMemo, useState } from 'react'
import LeadsFormModal from './LeadsFormModal/LeadsFormModal'
import StartUsingOverdoll from './StartUsingOverdoll/StartUsingOverdoll'
import FactItem from './FactItem/FactItem'
import QuestionAnswerItem from './QuestionAnswerItem/QuestionAnswerItem'
import RootClubsDisplay from './RootClubsDisplay/RootClubsDisplay'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import Email from '@//:modules/validation/Email'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import { CreatorsQuery } from '@//:artifacts/CreatorsQuery.graphql'
import Image from 'next/future/image'
import VideoAction from './VideoAction/VideoAction'
import CreatorsRichObject from '@//:common/rich-objects/artists/ArtistsRichObject/CreatorsRichObject'

const Query = graphql`
  query CreatorsQuery {
    viewer {
      username
      emails(first: 10) {
        edges {
          node {
            email
            status
          }
        }
      }
    }
  }
`

interface FormValues {
  email: string
  portfolio: string
  username: string
  details: string
}

const Creators: PageProps<{}> = () => {
  const data = useLazyLoadQuery<CreatorsQuery>(Query, {})

  const [isFinalized, setFinalized] = useState(false)

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

  const targetEmail = useMemo(() => {
    if (data?.viewer != null) {
      for (const item of data.viewer.emails.edges) {
        if (item.node.status === 'PRIMARY') {
          return item.node.email
        }
      }
    }

    return ''
  }, [data.viewer])

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      username: data?.viewer?.username,
      email: targetEmail
    },
    shouldUnregister: false
  })

  const onStartUsingOverdoll = (): void => {
    if (!isFinalized) {
      onOpen()
    }
  }

  const onFinalize = (): void => {
    setFinalized(true)
    onClose()
  }

  return (
    <>
      <CreatorsRichObject />
      <LeadsFormModal
        methods={methods}
        isOpen={isOpen}
        onClose={onClose}
        onFinalize={onFinalize}
      />
      <Flex flexDirection='column' backgroundColor='#000000'>
        <Flex zIndex={10} p={5} w='100%' maxWidth='1200px' alignSelf='center'>
          <SiteLinkLogo />
          <Box ml='auto'>
            <LinkButton
              href='/'
              borderRadius='lg'
              colorScheme='primary'
            >
              <Trans>
                Home
              </Trans>
            </LinkButton>
          </Box>
        </Flex>
        <Flex padding={['75px 25px', '75px 45px', '75px 45px']} mb={10}>
          <Box
            margin='0 auto'
            padding={['0px', '75px 0', '75px 0']}
            position='relative'
            textAlign='center'
            width='100%'
            zIndex={10}
            maxWidth='640px'
          >
            <Heading
              textShadow='-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              as='h1'
              fontSize={['2xl', '4xl', '5xl', '6xl']}
              color='white'
              lineHeight='1.1'
            >
              <Trans>
                The next platform for 18+ creators.
              </Trans>
            </Heading>
            <Text
              mt={8}
              textShadow='-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              fontSize={['md', 'md', 'lg', 'xl']}
              color='white'
            >
              <Trans>
                overdoll is the first platform to offer a full end-to-end ecosystem for adult content creators.
              </Trans>
            </Text>
            <Box mt={10} />
            <StartUsingOverdoll isFinalized={isFinalized} onClick={onStartUsingOverdoll} />
          </Box>
          <Flex
            left={0}
            top={0}
            bottom={0}
            position='absolute'
            right={0}
            height={['520px', '690px', '690px', '733px']}
          >
            <Flex
              as='picture'
              h='100%'
              w='100%'
              objectFit='cover'
            >
              <source
                media='(min-width: 760px)'
                srcSet='https://static.dollycdn.net/creators/banners/desktop.jpg'
              />
              <source
                media='(min-width: 330px)'
                srcSet='https://static.dollycdn.net/creators/banners/large.jpg'
              />
              <Image
                src='https://static.dollycdn.net/creators/banners/medium.jpg'
                unoptimized
                width={1000}
                height={1000}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
                alt='Creators banner'
              />
            </Flex>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position='absolute'
              backgroundColor='rgba(0,0,0,0.5)'
              backgroundImage='linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8))'
              borderBottom='2px solid #222'
            />
          </Flex>
        </Flex>
        <FactItem
          header={(
            <Trans>
              Get paid.
            </Trans>
          )}
          text={(
            <Trans>
              We exclusively partner with adult payment processors. Stop
              waiting for the day they shut down your PayPal account.
            </Trans>
          )}
        >
          <VideoAction width='200px' url='https://static.dollycdn.net/creators/clips/paid.mp4' />
        </FactItem>
        <FactItem
          reverse
          header={(
            <Trans>
              Visible to the entire universe.
            </Trans>
          )}
          text={(
            <Trans>
              Your brand is always visible on our platform. We don't force you to hide your content just because it
              contains nudity.
            </Trans>
          )}
        >
          <VideoAction width='200px' url='https://static.dollycdn.net/creators/clips/visible.mp4' />
        </FactItem>
        <FactItem
          header={(
            <Trans>
              The best browsing experience.
            </Trans>
          )}
          text={(
            <Trans>
              Your images are served up to 4k by 4k and videos up to 1080p@60fps. We are optimized for all devices -
              mobile & desktop.
            </Trans>
          )}
        >
          <VideoAction width='400px' url='https://static.dollycdn.net/creators/clips/browse.mp4' />
        </FactItem>
      </Flex>
      <Flex
        padding='45px 45px'
        backgroundColor='#000000'
        borderBottom='2px solid #222'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        textAlign='center'
      >
        <Heading
          as='h1'
          fontSize={['2xl', '3xl', '4xl']}
          color='white'
          lineHeight='1.1'
          mb={10}
          maxWidth='750px'
        >
          <Trans>
            Your favourite adult content creators are making money on overdoll.
          </Trans>
        </Heading>
        <RootClubsDisplay />
      </Flex>
      <Flex
        padding='70px 45px'
        backgroundColor='#000000'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Flex
          alignItems='center'
          justifyContent='center'
          margin='0 auto'
          maxWidth='1100px'
          paddingBottom='60px'
          textAlign='center'
        >
          <Heading
            as='h1'
            fontSize={['3xl', '4xl', '5xl']}
            color='white'
            lineHeight='1.1'
          >
            <Trans>
              Frequently Asked Questions
            </Trans>
          </Heading>
        </Flex>
        <Flex
          alignItems='center'
          justifyContent='center'
          margin='auto'
          width={['100%', '100%', '70%']}
          maxWidth='1100px'
        >
          <Accordion allowToggle width='100%'>
            <QuestionAnswerItem
              question={(
                <Trans>
                  What is overdoll?
                </Trans>
              )}
              answer={(
                <Trans>
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> is a content distribution platform
                  designed for creators who draw or animate/render digital pornography.
                </Trans>
              )}
            />
            <QuestionAnswerItem
              question={(
                <Trans>
                  How much does overdoll cost?
                </Trans>
              )}
              answer={(
                <Trans>
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> is free of charge to content creators.
                  Content creators may post as much as they want, without restrictions.
                </Trans>
              )}
            />
            <QuestionAnswerItem
              question={(
                <Trans>
                  Who uses overdoll?
                </Trans>
              )}
              answer={(
                <Trans>
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> is used by both creators and fans. Fans
                  use <HighlightInline colorScheme='pink'>overdoll</HighlightInline> to browse adult content, and may
                  find new creators directly through the discovery and search features. Creators use
                  <HighlightInline colorScheme='pink'> overdoll</HighlightInline> to feature
                  their adult content and may collect subscriptions for premium content.
                </Trans>
              )}
            />
            <QuestionAnswerItem
              question={(
                <Trans>
                  What type of content is allowed on overdoll?
                </Trans>
              )}
              answer={(
                <Trans>
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> focuses exclusively on pornography that
                  is drawn or animated. You may only post pornography that does
                  <strong><HighlightInline colorScheme='red'> not</HighlightInline></strong> feature real human beings.
                </Trans>
              )}
            />
            <QuestionAnswerItem
              question={(
                <Trans>
                  How can I make money on overdoll?
                </Trans>
              )}
              answer={(
                <Trans>
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> offers content creators the ability to
                  paywall some or all posts on their club pages in order to make money.
                  <HighlightInline colorScheme='pink'> overdoll</HighlightInline> also offers extra platform features to
                  your fans, if they subscribe.
                </Trans>
              )}
            />
          </Accordion>
        </Flex>
        <Text
          mt={10}
          fontSize='xl'
          color='white'
          align='center'
        >
          <Trans>
            Ready to try overdoll, free of charge?
          </Trans>
        </Text>
        <Box mt={4}>
          <StartUsingOverdoll isFinalized={isFinalized} onClick={onStartUsingOverdoll} />
        </Box>
      </Flex>
    </>
  )
}

export default Creators
