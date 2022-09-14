import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseSearchCharacter from '../SuspenseSearchCharacter/SuspenseSearchCharacter'

interface Props {
  loadQuery: () => void
}

export default function LoadSearchCharacter (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseSearchCharacter />
    </PageContainer>
  )
}
