import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseNew from '../SuspenseNew/SuspenseNew'

interface Props {
  loadQuery: () => void
}

export default function LoadNew (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseNew />
    </PageContainer>
  )
}
