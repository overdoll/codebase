import { PageProps } from '@//:types/app'
import { Trans } from '@lingui/macro'
import { Accordion, Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import SiteLinkLogo from '../../app/Root/DisposeRoot/ResultRoot/UniversalNavigator/SiteLinkLogo/SiteLinkLogo'
import React from 'react'
import Image from 'next/future/image'
import Head from 'next/head'
import LeadsForm from './LeadsForm/LeadsForm'
import StartUsingOverdoll from './StartUsingOverdoll/StartUsingOverdoll'
import FactItem from './FactItem/FactItem'
import QuestionAnswerItem from './QuestionAnswerItem/QuestionAnswerItem'
import RootClubsDisplay from './RootClubsDisplay/RootClubsDisplay'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'

const Creators: PageProps<{}> = () => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  return (
    <>
      <Head>
        <title>
          overdoll - For 18+ Creators
        </title>
      </Head>
      <LeadsForm isOpen={isOpen} onClose={onClose} />
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
        <Flex padding='45px 45px 0px 45px'>
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
              as='h1'
              fontSize='6xl'
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
              fontSize='xl'
              color='white'
            >
              <Trans>
                The first platform to offer a full end-to-end ecosystem for adult content creators.
              </Trans>
            </Text>
            <Box mt={10} />
            <StartUsingOverdoll onClick={onOpen} />
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
              backgroundColor='rgba(0,0,0,0.7)'
              backgroundImage='linear-gradient(0deg,rgba(0,0,0,.8) 0,transparent 60%,rgba(0,0,0,.8))'
              borderBottom='2px solid #222'
            />
          </Flex>
        </Flex>
        <Flex zIndex={10} mb={16} pb={4}>
          <RootClubsDisplay />
        </Flex>
        <FactItem
          header='Never miss rent again.'
          text='We partner with adult payment processors who offer decades of experience in the adult industry. Stop
              waiting for the day they shut down your PayPal account.'
        >
          some content
        </FactItem>
        <FactItem
          reverse
          header='Visible to the entire universe.'
          text="Your brand is always visible on our platform, never hidden from the world. We don't force you to hide all of your content just because it contains nudity."
        >
          some content
        </FactItem>
        <FactItem
          header='The best browsing experience.'
          text='We know you want to display your content in the best quality possible. Your images are served up to 4k by 4k and videos up to 1080p@60fps. We are optimized for all devices - mobile & desktop.'
        >
          some content
        </FactItem>
      </Flex>
      <Flex
        padding='70px 45px'
        backgroundColor='#000000'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Flex alignItems='center' justifyContent='center' margin='0 auto' maxWidth='1100px' paddingBottom='60px'>
          <Heading
            as='h1'
            fontSize='5xl'
            color='white'
            lineHeight='1.1'

          >
            <Trans>
              Frequently Asked Questions
            </Trans>
          </Heading>
        </Flex>
        <Flex alignItems='center' justifyContent='center' margin='auto' width='70%' maxWidth='1100px'>
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
                  designed for artists who
                  draw pornography and animators who render or animate 3D pornography, or animate porn.
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
                  <HighlightInline colorScheme='pink'>overdoll</HighlightInline> is used by both artists and fans. Fans
                  use <HighlightInline colorScheme='pink'>overdoll</HighlightInline> to browse adult content, and may
                  find new artists directly through the discovery and search features. Artists use
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
                  is drawn or animated. You may only post pornography that does not feature real human beings.
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
        >
          <Trans>
            Ready to try overdoll, free of charge?
          </Trans>
        </Text>
        <Box mt={4}>
          <StartUsingOverdoll onClick={onOpen} />
        </Box>
      </Flex>
    </>
  )
}

export default Creators
