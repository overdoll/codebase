import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'
import { ClickableTile } from '../../index'

export interface LoadMoreProps {
  onLoadNext: () => {}
  isLoadingNext: boolean
  text?: ReactNode
}

export default function LoadMore ({
  onLoadNext,
  isLoadingNext,
  text
}: LoadMoreProps): JSX.Element {
  return (
    <Flex w='100%' align='center' justify='center'>
      {isLoadingNext
        ? <Spinner color='gray.100' />
        : (
          <ClickableTile
            onClick={onLoadNext}
            h='100%'
          >
            <Flex
              whiteSpace='normal'
              wordBreak='break-word'
              w='100%'
              h='100%'
              justify='center'
              align='center'
            >
              <Heading align='center' color='gray.00' fontSize='sm'>
                {text != null
                  ? text
                  : (
                    <Trans>
                      Load More
                    </Trans>
                    )}
              </Heading>
            </Flex>
          </ClickableTile>
          )}
    </Flex>
  )
}
