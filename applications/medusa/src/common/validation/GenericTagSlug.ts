import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagSlug (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a slug`),
      'string.min': i18n._(t`The slug must be at least 2 characters`),
      'string.max': i18n._(t`The slug cannot exceed 30 characters`),
      'string.pattern.base': i18n._(t`The slug can only contain numbers, letters, and dashes.`)
    })
}
