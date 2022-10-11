import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseFeed from '../SuspenseFeed/SuspenseFeed'

interface Props {
  loadQuery: () => void
}

export default function LoadFeed (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseFeed />
    </PageContainer>
  )
}
