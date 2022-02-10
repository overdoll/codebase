import {
  Box,
  FormErrorMessage,
  FormHelperText,
  HTMLChakraProps,
  Input,
  InputGroup,
  InputRightElement,
  Spinner
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CheckMark, WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import { Icon } from '../../PageLayout'

interface Props extends HTMLChakraProps<any> {
  register: any
  success: boolean
  error: boolean
  placeholder: ReactNode
  errorMessage?: string
  helperText?: ReactNode | undefined
  size?: string
  variant?: string
  inputLeftAddon?: ReactNode
  isLoading?: boolean
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
  isLoading = false,
  ...rest
}: Props): JSX.Element {
  const determinePadding = (): number => {
    if (['xl'].includes(size)) {
      return 5
    }
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
          <Trans>
            {helperText}
          </Trans>
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
        {(error || success || isLoading) && (
          <InputRightElement
            p={determinePadding()}
            mr={0}
            h='100%'
            pointerEvents='none'
          >
            {isLoading
              ? <Spinner h={15} w={15} color='gray.200' />
              : <Icon
                  h='100%'
                  icon={success ? CheckMark : WarningTriangle}
                  fill={success ? 'green.500' : 'orange.500'}
                />}
          </InputRightElement>
        )}
      </InputGroup>
      <InputFooter />
    </Box>
  )
}
