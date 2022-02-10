import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { MobilePhone } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'

export default function TotpAppDownloadStep (): JSX.Element {
  return (
    <Stack spacing={4}>
      <Box>
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Download an Authenticator App
          </Trans>
        </Heading>
        <Text color='gray.100' fontSize='sm'>
          <Trans>
            Install an authenticator app for your mobile device. This app will be used to login to your account. We
            recommend using the following apps
          </Trans>
        </Text>
      </Box>
      <Stack spacing={2}>
        <PagePanelWrap isExternal path='support.google.com/accounts/answer/1066447'>
          <PagePanelIcon icon={MobilePhone} colorScheme='gray' />
          <PagePanelText
            title={
              <Trans>Google Authenticator</Trans>
            }
            description={(
              <Trans>Google Authenticator App</Trans>
            )}
          />
        </PagePanelWrap>
        <PagePanelWrap isExternal path='authy.com/features/setup/'>
          <PagePanelIcon icon={MobilePhone} colorScheme='gray' />
          <PagePanelText
            title={
              <Trans>Authy</Trans>
            }
            description={(
              <Trans>Twilio Authy App</Trans>
            )}
          />
        </PagePanelWrap>
      </Stack>
    </Stack>
  )
}
