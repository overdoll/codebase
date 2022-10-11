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

  if (!hasNext) {
    return <></>
  }

  return (
    <>
      {isLoadingNext && <LoadingSpinner />}
      {hasError && <ErrorButton onClick={loadNext} />}
      <LoadMoreObserver isLoadingNext={isLoadingNext || hasError || !hasNext} onObserve={loadNext} />
      <LoadMoreButton onClick={loadNext} />
    </>
  )
}
