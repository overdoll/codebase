import { Flex, Heading, HTMLChakraProps, Spinner } from '@chakra-ui/react'
import { RectangleGridItem } from '../../index'
import { Trans } from '@lingui/macro'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  hasNext: boolean
  onLoadNext: () => {}
  isLoadingNext: boolean
  text?: ReactNode
}

export default function LoadMoreRectangle ({
  hasNext,
  onLoadNext,
  isLoadingNext,
  text
}: Props): JSX.Element {
  if (hasNext) return <></>

  return (
    <RectangleGridItem>
      <Flex w='100%' h='100%' align='center' justify='center'>
        {isLoadingNext
          ? <Spinner color='gray.100' />
          : <ClickableBox wordWrap='break-word' w='100%' h='100%' onClick={onLoadNext}>
            <Flex w='100%' justify='center'>
              <Heading color='gray.00' fontSize='md'>
                {text != null
                  ? text
                  : <Trans>
                    Load More
                  </Trans>}
              </Heading>
            </Flex>
          </ClickableBox>}
      </Flex>
    </RectangleGridItem>
  )
}
