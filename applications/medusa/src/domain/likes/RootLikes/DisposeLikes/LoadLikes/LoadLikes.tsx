import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseLikes from '../SuspenseLikes/SuspenseLikes'

interface Props {
  loadQuery: () => void
}

export default function LoadLikes (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseLikes />
    </PageContainer>
  )
}
