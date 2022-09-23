import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspensePublicClubPosts from '../SuspensePublicClubPosts/SuspensePublicClubPosts'

interface Props {
  loadQuery: () => void
}

export default function LoadPublicClubPosts (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspensePublicClubPosts />
    </PageContainer>
  )
}
