import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PayoutsSettingsQuery } from '@//:artifacts/PayoutsSettingsQuery.graphql'
import { Flex, HStack, Stack } from '@chakra-ui/react'
import PayoutsDetailsSettings from './PayoutsDetailsSettings/PayoutsDetailsSettings'
import PayoutsMethodSettings from './PayoutsMethodSettings/PayoutsMethodSettings'
import AccountInformationBanner
  from '../../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: PreloadedQuery<PayoutsSettingsQuery>
}

const Query = graphql`
  query PayoutsSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      multiFactorTotpConfigured
      ...PayoutsDetailsSettingsFragment
      ...PayoutsMethodSettingsFragment
      ...AccountInformationBannerFragment
    }
  }
`

export default function PayoutsSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<PayoutsSettingsQuery>(
    Query,
    props.query
  )

  return (
    <>
      <AccountInformationBanner query={data.viewer} />
      {!data.viewer.multiFactorTotpConfigured && (
        <Alert
          status='warning'
          mb={2}
        >
          <Flex
            w='100%'
            align='center'
            justify='space-between'
          >
            <HStack spacing={0} align='center'>
              <AlertIcon />
              <AlertDescription>
                <Trans>
                  You must set up two factor before you can set up payouts for your account
                </Trans>
              </AlertDescription>
            </HStack>
            <LinkButton
              href='/settings/security'
              size='sm'
              colorScheme='orange'
              variant='solid'
            >
              <Trans>
                Setup
              </Trans>
            </LinkButton>
          </Flex>
        </Alert>
      )}
      <Stack spacing={2}>
        <PayoutsDetailsSettings query={data.viewer} />
        <PayoutsMethodSettings query={data.viewer} />
      </Stack>
    </>
  )
}
