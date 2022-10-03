import { useEffect } from 'react'
import { PageContainer } from '../../../PageLayout'
import SuspenseGeneric from '../SuspenseGeneric/SuspenseGeneric'

interface Props {
  loadQuery: () => void
}

export default function LoadGeneric (props: Props): JSX.Element {
  const { loadQuery } = props

  useEffect(() => {
    loadQuery()
  }, [])

  return (
    <PageContainer>
      <SuspenseGeneric />
    </PageContainer>
  )
}
