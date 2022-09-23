import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspensePublicClubCharacter from '../SuspensePublicClubCharacter/SuspensePublicClubCharacter'

interface Props {
  loadQuery: () => void
}

export default function LoadPublicClubCharacter (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspensePublicClubCharacter />
    </PageContainer>
  )
}
