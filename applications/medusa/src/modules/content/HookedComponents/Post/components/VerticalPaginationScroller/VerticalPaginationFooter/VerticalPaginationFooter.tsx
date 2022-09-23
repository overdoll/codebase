import ErrorButton from './ErrorButton/ErrorButton'
import LoadMoreObserver from '../LoadMoreObserver/LoadMoreObserver'
import LoadMoreButton from './LoadMoreButton/LoadMoreButton'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'

interface Props {
  loadNext: () => void
  hasNext: boolean
  hasError: boolean
  isLoadingNext: boolean
}

export default function VerticalPaginationFooter (props: Props): JSX.Element {
  const {
    loadNext,
    hasNext,
    hasError,
    isLoadingNext
  } = props

  if (isLoadingNext) {
    return <LoadingSpinner />
  }

  if (!hasNext) {
    return <></>
  }

  if (hasError) {
    return <ErrorButton onClick={loadNext} />
  }

  return (
    <>
      <LoadMoreObserver onObserve={loadNext} />
      <LoadMoreButton onClick={loadNext} />
    </>
  )
}
