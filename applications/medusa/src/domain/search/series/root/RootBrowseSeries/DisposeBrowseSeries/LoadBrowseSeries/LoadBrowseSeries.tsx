import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseBrowseSeries from '../SuspenseBrowseSeries/SuspenseBrowseSeries'

interface Props {
  loadQuery: () => void
}

export default function LoadBrowseSeries (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseBrowseSeries />
    </PageContainer>
  )
}
