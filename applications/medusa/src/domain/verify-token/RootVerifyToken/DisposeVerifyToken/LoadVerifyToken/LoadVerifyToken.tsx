import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseVerifyToken from '../SuspenseVerifyToken/SuspenseVerifyToken'

interface Props {
  loadQuery: () => void
}

export default function LoadVerifyToken (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseVerifyToken />
    </PageContainer>
  )
}
