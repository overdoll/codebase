import Joi from 'joi'
import { t } from '@lingui/macro'

export default function useUsernameFormSchema (): Joi.Schema {
  return Joi
    .string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': t`Please enter a username`,
      'string.min': t`Username must be at least 3 characters long`,
      'string.max': t`Username length cannot exceed 15 characters`,
      'string.alphanum': t`Usernames can only contain numbers and letters`
    })
}
