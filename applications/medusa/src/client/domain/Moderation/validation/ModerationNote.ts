import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function ModerationNote (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .min(5)
    .max(255)
    .required()
    .messages({
      'string.empty': i18n._(t`Please add a note`),
      'string.min': i18n._(t`The note needs at least 5 characters`),
      'string.max': i18n._(t`The note cannot exceed 255 characters`)
    })
}
