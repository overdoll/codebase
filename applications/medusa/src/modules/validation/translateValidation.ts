import { t } from '@lingui/macro'

export default function translateValidation (validation: string): string {
  const dictionary = {
    USERNAME_TAKEN: t`Sorry, this username is already taken`,
    SLUG_TAKEN: t`Sorry, this club link is already taken`,
    TOKEN_INVALID: t`The login link you used is either invalid or has expired`,
    RECOVERY_CODE_INVALID: t`This recovery code is invalid`,
    CODE_INVALID: t`This code is either invalid or has expired`,
    INVALID_CODE: t`This code is either invalid or has expired`
  }

  return dictionary[validation] != null ? dictionary[validation] : validation
}
