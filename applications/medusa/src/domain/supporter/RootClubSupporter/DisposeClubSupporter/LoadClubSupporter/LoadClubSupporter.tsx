import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseClubSupporter from '../SuspenseClubSupporter/SuspenseClubSupporter'

interface Props {
  loadQuery: () => void
}

export default function LoadClubSupporter (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseClubSupporter />
    </PageContainer>
  )
}
