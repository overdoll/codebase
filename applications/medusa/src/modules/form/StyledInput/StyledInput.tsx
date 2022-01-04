import {
  Box,
  FormErrorMessage,
  FormHelperText,
  HTMLChakraProps,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { Icon } from '../../content'
import { CheckMark, WarningTriangle } from '@//:assets/icons/interface'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  register: any
  success: boolean
  error: boolean
  placeholder: ReactNode
  errorMessage?: string
  helperText?: string | undefined
  size?: string
  variant?: string
  inputLeftAddon?: ReactNode
}

export default function StyledInput ({
  register,
  success,
  error,
  placeholder,
  errorMessage,
  helperText,
  size = 'md',
  variant = 'filled',
  inputLeftAddon,
  ...rest
}: Props): JSX.Element {
  const determineMargin = (): number => {
    if (['xl'].includes(size)) {
      return 2
    }
    return 0
  }

  const determinePadding = (): number => {
    if (['md', 'lg'].includes(size)) {
      return 3
    }
    return 2
  }

  const determineTextSizing = (): string => {
    if (['xs', 'sm', 'md', 'lg'].includes(size)) {
      return 'sm'
    }
    return size
  }

  const InputFooter = (): JSX.Element => {
    if (errorMessage == null && helperText != null) {
      return (
        <FormHelperText fontSize={determineTextSizing()}>
          {helperText}
        </FormHelperText>
      )
    }

    if (errorMessage != null) {
      return (
        <FormErrorMessage fontSize={determineTextSizing()}>
          {errorMessage}
        </FormErrorMessage>
      )
    }

    return <></>
  }

  return (
    <Box w='100%'>
      <InputGroup size={size ?? 'sm'}>
        {inputLeftAddon}
        <Input
          {...register}
          variant={variant}
          placeholder={placeholder}
          {...rest}
        />
        {(error || success) && (
          <InputRightElement
            p={determinePadding()}
            mr={determineMargin()}
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
      <InputFooter />
    </Box>
  )
}
