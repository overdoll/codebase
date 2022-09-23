import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseClubsFeed from '../SuspenseClubsFeed/SuspenseClubsFeed'

interface Props {
  loadQuery: () => void
}

export default function LoadClubsFeed (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseClubsFeed />
    </PageContainer>
  )
}
