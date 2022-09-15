import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseCreatePost from '../SuspenseCreatePost/SuspenseCreatePost'

interface Props {
  loadQuery: () => void
}

export default function LoadCreatePost (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseCreatePost />
    </PageContainer>
  )
}
