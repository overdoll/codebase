import React, { ReactNode } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultRootQuery as ResultRootQueryType } from '@//:artifacts/ResultRootQuery.graphql'
import ResultRootQuery from '@//:artifacts/ResultRootQuery.graphql'
import { PageProps } from '@//:types/app'
import DisposeRoot from './DisposeRoot/DisposeRoot'

interface Props {
  children: ReactNode
  queryRefs: {
    rootQuery: PreloadedQuery<ResultRootQueryType>
  }
}

const Root: PageProps<Props> = (props: Props): JSX.Element => {
  const {
    queryRefs: { rootQuery },
    children
  } = props

  const params = useQueryLoader(
    ResultRootQuery,
    rootQuery
  )

  return (
    <DisposeRoot params={params}>
      {children}
    </DisposeRoot>
  )
}

export default Root
