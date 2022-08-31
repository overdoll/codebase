import { LoadMore } from '../../index'
import { LoadMoreProps } from '../../LoadMore/LoadMore'
import { Box } from '@chakra-ui/react'
import ShortGridTile from '../ShortGridTile'

interface Props extends LoadMoreProps {
  hasNext: boolean
}

export default function LoadMoreShortGridTile ({
  hasNext,
  isLoadingNext,
  onLoadNext,
  text
}: Props): JSX.Element {
  if (!hasNext) return <></>

  return (
    <ShortGridTile>
      <Box w='100%' h='100%' bg='gray.800' borderRadius='md'>
        <LoadMore
          text={text}
          isLoadingNext={isLoadingNext}
          onLoadNext={onLoadNext}
        />
      </Box>
    </ShortGridTile>
  )
}
