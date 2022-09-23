import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseHome from '../SuspenseHome/SuspenseHome'

interface Props {
  loadQuery: () => void
}

export default function LoadHome (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseHome />
    </PageContainer>
  )
}
