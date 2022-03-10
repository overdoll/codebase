import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PaymentMethodSettingsQuery } from '@//:artifacts/PaymentMethodSettingsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'
import PaymentMethod from '../../../../../components/PaymentMethod/PaymentMethod'

interface Props {
  query: PreloadedQuery<PaymentMethodSettingsQuery>
}

const Query = graphql`
  query PaymentMethodSettingsQuery {
    viewer @required(action: THROW) {
      ...PaymentMethodSettingsFragment
    }
  }
`

const Fragment = graphql`
  fragment PaymentMethodSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "SavedPaymentMethodsPaginationQuery" ) {
    savedPaymentMethods (first: $first, after: $after)
    @connection (key: "PaymentMethodSettings_savedPaymentMethods") {
      edges {
        node {
          paymentMethod {
            ...PaymentMethodFragment
          }
        }
      }
    }
  }
`
export default function PaymentMethodSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PaymentMethodSettingsQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<PaymentMethodSettingsQuery, any>(
    Fragment,
    queryData.viewer
  )

  if (data.savedPaymentMethods.edges.length < 1) {
    return <></>
  }

  return (
    <Stack spacing={2}>
      {data.savedPaymentMethods.edges.map((item, index) => (
        <StackTile key={index}>
          <PaymentMethod query={item.node.paymentMethod} />
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
