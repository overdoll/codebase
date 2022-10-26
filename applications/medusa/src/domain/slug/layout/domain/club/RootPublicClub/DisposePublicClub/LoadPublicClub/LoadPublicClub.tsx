import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspensePublicClub from '../SuspensePublicClub/SuspensePublicClub'

interface Props {
  loadQuery: () => void
}

export default function LoadPublicClub (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspensePublicClub />
    </PageContainer>
  )
}
