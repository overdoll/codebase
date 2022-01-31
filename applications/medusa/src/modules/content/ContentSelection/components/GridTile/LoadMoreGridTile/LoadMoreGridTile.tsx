import { GridTile, LoadMore } from '../../../index'
import { LoadMoreProps } from '../../LoadMore/LoadMore'

interface Props extends LoadMoreProps {
  hasNext: boolean
}

export default function LoadMoreGridTile ({
  hasNext,
  isLoadingNext,
  onLoadNext,
  text
}: Props): JSX.Element {
  if (!hasNext) return <></>

  return (
    <GridTile>
      <LoadMore
        text={text}
        isLoadingNext={isLoadingNext}
        onLoadNext={onLoadNext}
      />
    </GridTile>
  )
}
