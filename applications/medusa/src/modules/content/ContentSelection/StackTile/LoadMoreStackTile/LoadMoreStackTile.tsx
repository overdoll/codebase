import { LoadMore, StackTile } from '../../index'
import { LoadMoreProps } from '../../LoadMore/LoadMore'
import { Box } from '@chakra-ui/react'

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
      <Box borderRadius='md' bg='gray.800' w='100%' h={16}>
        <LoadMore
          text={text}
          isLoadingNext={isLoadingNext}
          onLoadNext={onLoadNext}
        />
      </Box>
    </StackTile>
  )
}
