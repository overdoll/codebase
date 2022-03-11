import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SavedPaymentMethodsSettingsQuery } from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { HStack, Stack, Text } from '@chakra-ui/react'
import PaymentMethod from '../../../../../components/PaymentMethod/PaymentMethod'
import { LargeBackgroundBox, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ManageSavedPaymentMethodButton from './ManageSavedPaymentMethodButton/ManageSavedPaymentMethodButton'

interface Props {
  query: PreloadedQuery<SavedPaymentMethodsSettingsQuery>
}

const Query = graphql`
  query SavedPaymentMethodsSettingsQuery {
    viewer @required(action: THROW) {
      ...SavedPaymentMethodsSettingsFragment
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

  if (data.savedPaymentMethods.edges.length < 1) {
    return (
      <SmallBackgroundBox>
        <Text fontSize='sm'>
          <Trans>
            You haven't saved any payment methods yet
          </Trans>
        </Text>
      </SmallBackgroundBox>
    )
  }

  return (
    <Stack spacing={2}>
      {data.savedPaymentMethods.edges.map((item, index) => (
        <StackTile key={index}>
          <LargeBackgroundBox w='100%'>
            <HStack h='100%' align='center' spacing={4} justify='space-between'>
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
  )
}
