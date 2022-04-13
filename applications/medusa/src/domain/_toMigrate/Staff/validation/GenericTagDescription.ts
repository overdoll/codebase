import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagDescription (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .min(5)
    .max(255)
    .messages({
      'string.empty': i18n._(t`Please enter a description`),
      'string.min': i18n._(t`The description must be at least 5 characters`),
      'string.max': i18n._(t`The description cannot exceed 255 characters`)
    })
}
