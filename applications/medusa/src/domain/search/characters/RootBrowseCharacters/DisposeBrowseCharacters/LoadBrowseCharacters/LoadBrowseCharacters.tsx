import { useEffect } from 'react'
import { PageContainer } from '@//:modules/content/PageLayout'
import SuspenseBrowseCharacters from '../SuspenseBrowseCharacters/SuspenseBrowseCharacters'

interface Props {
  loadQuery: () => void
}

export default function LoadBrowseCharacters (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseBrowseCharacters />
    </PageContainer>
  )
}
