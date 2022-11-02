import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseBrowseCategories from '../SuspenseBrowseCategories/SuspenseBrowseCategories'

interface Props {
  loadQuery: () => void
}

export default function LoadBrowseCategories (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseBrowseCategories />
    </PageContainer>
  )
}
