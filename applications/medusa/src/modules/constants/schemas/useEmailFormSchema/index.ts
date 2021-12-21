import Joi from 'joi'
import { t } from '@lingui/macro'

export default function useEmailFormSchema (): Joi.Schema {
  return Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {}
    })
    .required()
    .messages({
      'string.empty': t`Please enter an email address`,
      'string.email': t`Please enter a valid email address`
    })
}
