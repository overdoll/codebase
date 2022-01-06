import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function ClubName (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .min(3)
    .max(25)
    .messages({
      'string.empty': i18n._(t`Please enter a name for your club`),
      'string.min': i18n._(t`The name must be at least 3 characters`),
      'string.max': i18n._(t`The name cannot exceed 25 characters`)
    })
}
