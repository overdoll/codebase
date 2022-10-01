import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseJoin from '../SuspenseJoin/SuspenseJoin'

interface Props {
  loadQuery: () => void
}

export default function LoadJoin (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseJoin />
    </PageContainer>
  )
}
