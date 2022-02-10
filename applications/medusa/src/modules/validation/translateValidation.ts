import { defineMessage } from '@lingui/macro'

export default function translateValidation (validation: string): string {
  const dictionary = {
    USERNAME_TAKEN: defineMessage({ message: 'Sorry, this username is already taken' }),
    SLUG_TAKEN: defineMessage({ message: 'Sorry, this club link is already taken' }),
    TOKEN_INVALID: defineMessage({ message: 'The login link you used is either invalid or has expired' }),
    RECOVERY_CODE_INVALID: defineMessage({ message: 'This recovery code is invalid' }),
    CODE_INVALID: defineMessage({ message: 'This code is either invalid or has expired' }),
    INVALID_CODE: defineMessage({ message: 'This code is either invalid or has expired' })
  }

  return dictionary[validation] != null ? dictionary[validation] : validation
}
