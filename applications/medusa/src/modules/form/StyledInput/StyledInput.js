/**
 * @flow
 */
import type { Node } from 'react'
import { FormErrorMessage, Input, InputGroup, InputRightElement, Box } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'

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
          <InputRightElement h='100%' pointerEvents='none'>
            <Icon
              h={4}
              w={4}
              icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
              fill={success ? 'gray.100' : 'orange.500'}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>
        {errorMessage}
      </FormErrorMessage>
    </Box>
  )
}
