import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseBrowse from '../SuspenseBrowse/SuspenseBrowse'

interface Props {
  loadQuery: () => void
}

export default function LoadBrowse (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseBrowse />
    </PageContainer>
  )
}
