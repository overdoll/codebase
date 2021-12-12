/**
 * @flow
 */
import type { Node } from 'react'
import { Box, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { CheckMark, WarningTriangle } from '../../../assets/icons/interface'

type Props = {
  register: string,
  success: boolean,
  error: boolean,
  placeholder: string,
  errorMessage: string,
  size?: string,
  variant?: string
};

export default function StyledInput ({ register, success, error, placeholder, errorMessage, size, variant }: Props): Node {
  const determinePadding = () => {
    if (['xl', 'lg'].includes(size)) {
      return 3
    }
    return 2
  }

  return (
    <Box w='100%'>
      <InputGroup>
        <Input
          {...register}
          variant={variant || 'filled'}
          size={size || 'sm'}
          placeholder={placeholder}
        />
        {(error || success) && (
          <InputRightElement p={determinePadding()} h='100%' pointerEvents='none'>
            <Icon
              h='100%'
              icon={success ? CheckMark : WarningTriangle}
              fill={success ? 'green.500' : 'orange.500'}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage fontSize={size || 'sm'}>
        {errorMessage}
      </FormErrorMessage>
    </Box>
  )
}
