import { graphql, useFragment } from 'react-relay/hooks'
import type {
  CCBillUpdatePaymentMethodInstructionsFragment$key
} from '@//:artifacts/CCBillUpdatePaymentMethodInstructionsFragment.graphql'
import { Trans } from '@lingui/macro'
import { Box, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import CopyCodeToClipboard
  from '../../../../../../../../../../components/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import Highlight from '../../../../../../../../../../components/HighlightText/Highlight'
import { ExternalLink } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: CCBillUpdatePaymentMethodInstructionsFragment$key
}

const Fragment = graphql`
  fragment CCBillUpdatePaymentMethodInstructionsFragment on AccountActiveClubSupporterSubscription {
    ccbillSubscription @required(action: THROW) {
      ccbillSubscriptionId
      email
      paymentMethod
      link
    }
  }
`

export default function CCBillUpdatePaymentMethodInstructions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <Tabs defaultIndex={1} colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Tab fontSize='sm'>
            <Trans>
              Use Generated Link
            </Trans>
          </Tab>
          <Tab fontSize='sm'>
            <Trans>
              Manually Enter Information
            </Trans>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Text fontSize='sm' color='gray.00'>
                  <Trans>
                    Open the CCBill Support Center link using the button below
                  </Trans>
                </Text>
                <ExternalLink to={data.ccbillSubscription.link}>
                  <Button size='sm' colorScheme='teal'>
                    <Trans>
                      Open Generated Support Center Link
                    </Trans>
                  </Button>
                </ExternalLink>
              </Stack>
              <Stack spacing={1}>
                <Text fontSize='sm' color='gray.00'>
                  <Trans>
                    In the section where it asks <Highlight colorScheme='teal'>Enter 2 of the following pieces of
                      information to
                      run a search
                                                 </Highlight>, enter this information and click <Highlight colorScheme='teal'>Search</Highlight>
                  </Trans>
                </Text>
                <Box>
                  <Text fontSize='sm' color='gray.100'>
                    <Trans>
                      Email
                    </Trans>
                  </Text>
                  <CopyCodeToClipboard>
                    {data.ccbillSubscription.email}
                  </CopyCodeToClipboard>
                </Box>
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={2}>
              <Box>
                <Text fontSize='sm' color='gray.00'>
                  <Trans>
                    Navigate to the
                  </Trans>
                  {' '}
                  <Link color='teal.400' fontSize='sm' isExternal href='https://support.ccbill.com/'>
                    <Trans>
                      CCBill Support Center
                    </Trans>
                  </Link>
                </Text>
              </Box>
              <Stack spacing={1}>
                <Text fontSize='sm' color='gray.00'>
                  <Trans> In the section where it asks <Highlight colorScheme='teal'>Tell us how you purchased your
                    subscription
                  </Highlight>, enter
                    this information
                  </Trans>
                </Text>
                <CopyCodeToClipboard>
                  {data.ccbillSubscription.paymentMethod}
                </CopyCodeToClipboard>
              </Stack>
              <Stack spacing={1}>
                <Text fontSize='sm' color='gray.00'>
                  <Trans>
                    In the section where it asks <Highlight colorScheme='teal'>Enter 2 of the following pieces of
                      information to
                      run a search
                                                 </Highlight>, enter these
                    two pieces of information and click <Highlight colorScheme='teal'>Search</Highlight>
                  </Trans>
                </Text>
                <Box>
                  <Text fontSize='sm' color='gray.100'>
                    <Trans>
                      Email
                    </Trans>
                  </Text>
                  <CopyCodeToClipboard>
                    {data.ccbillSubscription.email}
                  </CopyCodeToClipboard>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.100'>
                    <Trans>
                      Subscription ID
                    </Trans>
                  </Text>
                  <CopyCodeToClipboard>
                    {data.ccbillSubscription.ccbillSubscriptionId}
                  </CopyCodeToClipboard>
                </Box>
              </Stack>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text fontSize='sm' color='gray.00'>
        <Trans>
          A list with one or more subscriptions should appear. <Highlight colorScheme='teal'>Find the Subscription ID
            that correlates to the one
            listed here
                                                               </Highlight> and click on <Highlight colorScheme='teal'>Click here to update your payment
            information
        </Highlight> to update your payment information.
        </Trans>
      </Text>
    </Stack>

  )
}
