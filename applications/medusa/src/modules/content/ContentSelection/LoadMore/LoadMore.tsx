import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'
import { ClickableTile } from '../index'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'

export interface LoadMoreProps {
  onLoadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  text?: ReactNode
}

export default function LoadMore ({
  onLoadNext,
  isLoadingNext,
  text
}: LoadMoreProps): JSX.Element {
  return (
    <Flex borderRadius='inherit' h='inherit' w='inherit' align='center' justify='center'>
      {isLoadingNext
        ? <Spinner color='gray.100' />
        : (
          <ClickableTile
            onClick={onLoadNext as any}
            borderRadius='inherit'
            h='inherit'
            w='inherit'
          >
            <Flex
              whiteSpace='normal'
              wordBreak='break-word'
              w='100%'
              h='100%'
              justify='center'
              align='center'
            >
              <Heading alignContent='center' color='gray.00' fontSize='sm'>
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
