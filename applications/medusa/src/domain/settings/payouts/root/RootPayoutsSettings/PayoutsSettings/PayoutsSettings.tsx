import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PayoutsSettingsQuery } from '@//:artifacts/PayoutsSettingsQuery.graphql'
import { Stack } from '@chakra-ui/react'
import PayoutsDetailsSettings from './PayoutsDetailsSettings/PayoutsDetailsSettings'
import PayoutsMethodSettings from './PayoutsMethodSettings/PayoutsMethodSettings'

interface Props {
  query: PreloadedQuery<PayoutsSettingsQuery>
}

const Query = graphql`
  query PayoutsSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      ...PayoutsDetailsSettingsFragment
      ...PayoutsMethodSettingsFragment
    }
  }
`

export default function PayoutsSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<PayoutsSettingsQuery>(
    Query,
    props.query
  )

  return (
    <Stack spacing={8}>
      <PayoutsDetailsSettings query={data.viewer} />
      <PayoutsMethodSettings query={data.viewer} />
    </Stack>
  )
}