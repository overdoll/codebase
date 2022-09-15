import {
  Flex,
  RenderProps,
  ToastPosition,
  useBreakpointValue,
  useToast as useChakraToast,
  UseToastOptions
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { Alert, AlertCloseButton, AlertDescription, AlertIcon, AlertTitle } from '../Alert/Alert'
import { useSwipeable } from 'react-swipeable'

type UseToastInput = UseToastOptions

export type ToastAlertProps = RenderProps & UseToastOptions

export default function useToast (options: UseToastInput = {}): (options: UseToastInput) => void {
  const position = useBreakpointValue<ToastPosition>({
    base: 'top',
    md: 'bottom-right'
  }, 'top')

  const toast = useCallback(useChakraToast({
    variant: 'toast',
    position: position,
    ...options
  }), [position])

  const ToastAlert = (props: ToastAlertProps): JSX.Element => {
    const {
      id,
      onClose,
      status = 'info',
      title,
      description,
      isClosable = true
    } = props

    // if user swipes the toast in any direction, we close it
    const swipeHandler = useSwipeable({
      onSwiped: () => isClosable && onClose()
    })

    return (
      <Alert
        status={status}
        variant='toast'
        id={id as string}
        align='center'
        borderRadius='md'
        boxShadow='lg'
        paddingEnd={8}
        textAlign='start'
        width='auto'
        {...swipeHandler}
      >
        <AlertIcon />
        <Flex maxWidth='100%'>
          {title != null && <AlertTitle>{title}</AlertTitle>}
          {description != null && (
            <AlertDescription display='block'>{description}</AlertDescription>
          )}
        </Flex>
        {isClosable && (
          <AlertCloseButton
            size='xs'
            color='gray.00'
            onClick={onClose}
            position='absolute'
            insetEnd={1}
            top={1}
          />
        )}
      </Alert>
    )
  }

  return (options: UseToastOptions): void => {
    const {
      title,
      description,
      isClosable,
      status,
      duration = 1500,
      ...rest
    } = options
    toast(
      {
        render: (renderProps) => (
          <ToastAlert
            status={status ?? 'info'}
            title={title}
            description={description}
            isClosable={isClosable}
            {...renderProps}
          />
        ),
        duration,
        ...rest
      }
    )
  }
}
