import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseRoot from '../SuspenseRoot/SuspenseRoot'

interface Props {
  loadQuery: () => void
}

export default function LoadRoot (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseRoot />
    </PageContainer>
  )
}
