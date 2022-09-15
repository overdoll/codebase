import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseLikedPosts from '../SuspenseLikedPosts/SuspenseLikedPosts'

interface Props {
  loadQuery: () => void
}

export default function LoadLikedPosts (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseLikedPosts />
    </PageContainer>
  )
}
