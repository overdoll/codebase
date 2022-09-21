import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseTop from '../SuspenseTop/SuspenseTop'

interface Props {
  loadQuery: () => void
}

export default function LoadTop (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseTop />
    </PageContainer>
  )
}
