import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseRandom from '../SuspenseRandom/SuspenseRandom'

interface Props {
  loadQuery: () => void
}

export default function LoadRandom (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseRandom />
    </PageContainer>
  )
}
