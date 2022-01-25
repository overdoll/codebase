import { LoadMore, StackTile } from '../../../index'
import { LoadMoreProps } from '../../LoadMore/LoadMore'

interface Props extends LoadMoreProps {
  hasNext: boolean
}

export default function LoadMoreStackTile ({
  hasNext,
  isLoadingNext,
  onLoadNext,
  text
}: Props): JSX.Element {
  if (!hasNext) return <></>

  return (
    <StackTile>
      <LoadMore
        text={text}
        isLoadingNext={isLoadingNext}
        onLoadNext={onLoadNext}
      />
    </StackTile>
  )
}
