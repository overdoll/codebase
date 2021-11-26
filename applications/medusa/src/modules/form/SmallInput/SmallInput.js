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
};

export default function SmallInput ({ register, success, error, placeholder, errorMessage }: Props): Node {
  return (
    <Box w='100%'>
      <InputGroup>
        <Input
          {...register}
          variant='filled'
          size='sm'
          placeholder={placeholder}
        />
        {(error || success) && (
          <InputRightElement h='32px' pointerEvents='none'>
            <Icon
              m={3}
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
