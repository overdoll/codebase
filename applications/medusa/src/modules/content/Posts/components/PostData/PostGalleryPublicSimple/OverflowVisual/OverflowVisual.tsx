import { Flex, FlexProps, Heading } from '@chakra-ui/react'
import { ReactNode, useRef } from 'react'
import { Trans } from '@lingui/macro'

interface Props extends FlexProps {
  children: ReactNode

}

export default function OverflowVisual ({
  children,
  minH,
  ...rest
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  const isOverflowing = ref?.current != null ? ref?.current?.clientHeight < ref?.current?.scrollHeight : false

  return (
    <Flex
      position='relative'
      ref={ref}
      w='100%'
      direction='column'
      minH={minH}
      overflow='hidden'
      justify={isOverflowing ? undefined : 'center'}
      {...rest}
    >
      {children}
      {isOverflowing && (
        <Flex
          align='center'
          justify='center'
          bottom={0}
          h={12}
          w='100%'
          position='absolute'
          bg='dimmers.100'
          pointerEvents='none'
        >
          <Flex
            bg='dimmers.500'
            py={2}
            px={3}
            borderRadius='md'
            align='center'
            justify='center'
          >
            <Heading fontSize='sm' color='gray.00'>
              <Trans>
                See Full Size
              </Trans>
            </Heading>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
