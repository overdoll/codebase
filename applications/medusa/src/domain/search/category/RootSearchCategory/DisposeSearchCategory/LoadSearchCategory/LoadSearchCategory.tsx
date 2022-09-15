import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseSearchCategory from '../SuspenseSearchCategory/SuspenseSearchCategory'

interface Props {
  loadQuery: () => void
}

export default function LoadSearchCategory (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseSearchCategory />
    </PageContainer>
  )
}
