import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SavedPaymentMethodsSettingsQuery } from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { HStack, Stack } from '@chakra-ui/react'
import PaymentMethod from '../../../../../components/PaymentMethod/PaymentMethod'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import ManageSavedPaymentMethodButton from './ManageSavedPaymentMethodButton/ManageSavedPaymentMethodButton'
import { EmptyBoundary, EmptyPaymentMethods } from '@//:modules/content/Placeholder'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: PreloadedQuery<SavedPaymentMethodsSettingsQuery>
}

const Query = graphql`
  query SavedPaymentMethodsSettingsQuery {
    viewer @required(action: THROW) {
      ...SavedPaymentMethodsSettingsFragment
      isSecure
    }
  }
`

const Fragment = graphql`
  fragment SavedPaymentMethodsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SavedPaymentMethodsPaginationQuery" ) {
    savedPaymentMethods (first: $first, after: $after)
    @connection (key: "PaymentMethodSettings_savedPaymentMethods") {
      __id
      edges {
        node {
          paymentMethod {
            ...PaymentMethodFragment
          }
          ...ManageSavedPaymentMethodButtonFragment
        }
      }
    }
  }
`
export default function SavedPaymentMethodsSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SavedPaymentMethodsSettingsQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SavedPaymentMethodsSettingsQuery, any>(
    Fragment,
    queryData.viewer
  )

  return (
    <EmptyBoundary
      fallback={<EmptyPaymentMethods />}
      condition={data.savedPaymentMethods.edges.length < 1}
    >
      <Stack spacing={2}>
        {!queryData.viewer.isSecure && (
          <Alert status='warning'>
            <HStack spacing={4} justify='space-between'>
              <HStack>
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    You must enable two-factor authentication before you can use a saved payment method
                  </Trans>
                </AlertDescription>
              </HStack>
              <LinkButton
                size='sm'
                colorScheme='orange'
                variant='solid'
                to='/settings/security'
              >
                <Trans>
                  Set Up
                </Trans>
              </LinkButton>
            </HStack>
          </Alert>
        )}
        {data.savedPaymentMethods.edges.map((item, index) => (
          <StackTile key={index}>
            <LargeBackgroundBox w='100%'>
              <HStack h='100%' align='center' spacing={3} justify='space-between'>
                <PaymentMethod query={item.node.paymentMethod} />
                <ManageSavedPaymentMethodButton connectionId={data.savedPaymentMethods.__id} query={item.node} />
              </HStack>
            </LargeBackgroundBox>
          </StackTile>
        ))}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(3)}
          isLoadingNext={isLoadingNext}
        />
      </Stack>
    </EmptyBoundary>

  )
}
