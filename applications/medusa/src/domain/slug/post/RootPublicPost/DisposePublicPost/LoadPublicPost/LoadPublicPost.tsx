import SuspensePublicPost from '../SuspensePublicPost/SuspensePublicPost'
import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'

interface Props {
  loadQuery: () => void
}

export default function LoadPublicPost (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspensePublicPost />
    </PageContainer>
  )
}
