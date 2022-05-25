import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import Head from 'next/head'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import AdvertBoxWrapper from '../../../join/Join/components/PlatformBenefitsAdvert/AdvertBoxWrapper/AdvertBoxWrapper'
import { ArrowButtonLeft, RemoveCross } from '@//:assets/icons'
import BackgroundPatternWrapper from '../../../join/Join/components/BackgroundPatternWrapper/BackgroundPatternWrapper'

export default function Invalid (): JSX.Element {
  return (
    <>
      <Head>
        <title>Invalid authentication :: overdoll</title>
      </Head>
      <BackgroundPatternWrapper>
        <PageWrapperDesktop>
          <Center>
            <AdvertBoxWrapper>
              <Stack justify='center' h='100%' spacing={6}>
                <Icon
                  icon={RemoveCross}
                  w={16}
                  h={16}
                  fill='orange.400'
                />
                <Box>
                  <Heading
                    textAlign='center'
                    fontSize='xl'
                    color='gray.00'
                    mb={1}
                  >
                    <Trans>
                      The login link you are attempting to use is either invalid or expired
                    </Trans>
                  </Heading>
                  <Heading textAlign='center' color='gray.300' fontSize='sm'>
                    <Trans>
                      Please try logging in with another link
                    </Trans>
                  </Heading>
                </Box>
                <Center>
                  <LinkButton
                    size='md'
                    colorScheme='orange'
                    variant='solid'
                    href='/join'
                    leftIcon={<Icon icon={ArrowButtonLeft} fill='orange.900' w={4} h={4} />}
                  >
                    <Trans>
                      Back to the Join page
                    </Trans>
                  </LinkButton>
                </Center>
              </Stack>
            </AdvertBoxWrapper>
          </Center>
        </PageWrapperDesktop>
      </BackgroundPatternWrapper>
    </>
  )
}
