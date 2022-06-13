import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { Center, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { OverdollLogo } from '@//:assets/logos'

const CatchAll: PageProps<{}> = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          Not Found :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Icon
            icon={OverdollLogo}
            w={32}
            h={32}
            fill='primary.400'
          />
          <Heading
            fontSize='lg'
            textAlign='center'
            color='gray.00'
          >
            <Trans>
              It doesn't look like there's anything here
            </Trans>
          </Heading>
          <Center mt={8}>
            <Stack
              direction={['column', 'row']}
              spacing='24px'
            >
              <Button
                size='lg'
                onClick={() => {
                  router.back()
                }}
              >
                <Trans>
                  Back
                </Trans>
              </Button>
              <LinkButton
                size='lg'
                colorScheme='primary'
                href='/'
              >
                <Trans>
                  Home
                </Trans>
              </LinkButton>
            </Stack>
          </Center>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default CatchAll
