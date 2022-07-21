import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagName (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .min(1)
    .max(70)
    .messages({
      'string.empty': i18n._(t`Please enter a name`),
      'string.min': i18n._(t`The name must be at least 1 character`),
      'string.max': i18n._(t`The name cannot exceed 70 characters`)
    })
}
