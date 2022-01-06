import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function ClubSlug (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .regex(/^[a-z0-9-]+$/)
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a club link`),
      'string.min': i18n._(t`The club link must be at least 3 characters`),
      'string.max': i18n._(t`The club link cannot exceed 15 characters`),
      'string.pattern.base': i18n._(t`The club link can only contain numbers, letters, and dashes.`)
    })
}
