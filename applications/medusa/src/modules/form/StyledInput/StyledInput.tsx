import { Box, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Icon } from '../../content'
import { CheckMark, WarningTriangle } from '@//:assets/icons/interface'
import { ReactNode } from 'react'

interface Props {
  register: any
  success: boolean
  error: boolean
  placeholder: ReactNode
  errorMessage?: string
  size?: string
  variant?: string
}

export default function StyledInput ({
  register,
  success,
  error,
  placeholder,
  errorMessage,
  size,
  variant
}: Props): JSX.Element {
  const determineMargin = (): number | undefined => {
    if (size == null) return undefined

    if (['xl', 'lg'].includes(size)) {
      return 2
    }
    return 0
  }

  const determinePadding = (): number | undefined => {
    if (size == null) return undefined

    if (['md'].includes(size)) {
      return 3
    }
    return 2
  }

  const determineTextSizing = (): string | undefined => {
    if (size == null) return undefined

    if (['xs', 'sm', 'md', 'lg'].includes(size)) {
      return 'sm'
    }
    return size
  }

  return (
    <Box w='100%'>
      <InputGroup>
        <Input
          {...register}
          variant={variant ?? 'filled'}
          size={size ?? 'sm'}
          placeholder={placeholder}
        />
        {(error || success) && (
          <InputRightElement
            p={determinePadding() ?? 2}
            mr={determineMargin() ?? 0}
            h='100%'
            pointerEvents='none'
          >
            <Icon
              h='100%'
              icon={success ? CheckMark : WarningTriangle}
              fill={success ? 'green.500' : 'orange.500'}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage fontSize={determineTextSizing() ?? 'sm'}>
        {errorMessage}
      </FormErrorMessage>
    </Box>
  )
}
