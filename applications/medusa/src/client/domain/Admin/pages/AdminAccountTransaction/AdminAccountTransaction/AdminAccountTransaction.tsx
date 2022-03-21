import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminAccountTransactionQuery } from '@//:artifacts/AdminAccountTransactionQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import { Stack } from '@chakra-ui/react'
import AdminTransactionCard
  from '../../../components/AdminTransactionsList/AdminTransactionCard/AdminTransactionCard'
import { TableBodyRowBackground } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: PreloadedQuery<AdminAccountTransactionQuery>
}

const Query = graphql`
  query AdminAccountTransactionQuery($reference: String!) {
    accountTransaction(reference: $reference) {
      ...AdminTransactionCardFragment
    }
  }
`

export default function AdminAccountTransaction ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminAccountTransactionQuery>(
    Query,
    query
  )

  if (queryData?.accountTransaction == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={6}>
      <TableBodyRowBackground>
        <AdminTransactionCard query={queryData?.accountTransaction} />
      </TableBodyRowBackground>
    </Stack>
  )
}
