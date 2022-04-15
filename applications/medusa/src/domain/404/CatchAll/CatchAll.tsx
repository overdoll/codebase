import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { Center, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
        <Icon
          icon={BadgeCircle}
          fill='primary.500'
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={8}
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
      </PageWrapper>
    </>
  )
}

export default CatchAll
