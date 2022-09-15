import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseSearchSeries from '../SuspenseSearchSeries/SuspenseSearchSeries'

interface Props {
  loadQuery: () => void
}

export default function LoadSearchSeries (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseSearchSeries />
    </PageContainer>
  )
}
