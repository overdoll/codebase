import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { BadgeCircle } from '@//:assets/icons/navigation'
import { Center, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import NotFound from '@//:modules/routing/NotFound'
import LinkButton from '@//:modules/form/LinkButton/LinkButton'

export default function CatchAll (): JSX.Element {
  return (
    <NotFound>
      <Helmet title='error' />
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
          size='md'
          align='center'
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
                history.back()
              }}
            >
              <Trans>
                Back
              </Trans>
            </Button>
            <LinkButton
              size='lg'
              colorScheme='primary'
              to='/'
            >
              <Trans>
                Home
              </Trans>
            </LinkButton>
          </Stack>
        </Center>
      </PageWrapper>
    </NotFound>
  )
}
